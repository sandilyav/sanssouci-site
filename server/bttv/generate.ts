import 'dotenv/config';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

import { DateTime } from 'luxon';

import { SANS_SOUCI_LAT, SANS_SOUCI_LNG, SANS_SOUCI_TIMEZONE } from '../../src/config/location';
import { DAYS_TO_FETCH, REFRESH_HOURS, WINDOW_BLOCKS } from './config';
import type { BestTimesPayload, DayRecommendations, TideEntry, WindowRecommendation } from './types';
import { fetchAstronomy, fetchTide, fetchWeather } from './stormglass';
import {
  applyMoonPhaseBonus,
  buildSummary,
  computeActivityScores,
  overallWindowScore,
  type TideState
} from './scoring';
import { average, formatActivitiesList, pickValue, ratingFromScore, round } from './utils';

const OUTPUT_PATH = path.resolve(process.cwd(), 'public/data/best-times.json');

const toLocal = (iso: string) => DateTime.fromISO(iso, { zone: 'utc' }).setZone(SANS_SOUCI_TIMEZONE);
const toIsoString = (date: DateTime) =>
  date.toISO() ?? date.setZone('utc').toISO() ?? `${date.toISODate() ?? 'unknown'}T00:00:00`;

const determineTideState = (samples: TideEntry[]): TideState => {
  if (!samples.length) return 'low';
  const maxHeight = Math.max(...samples.map((sample) => sample.height));
  if (maxHeight >= 1.5) return 'high';
  const minHeight = Math.min(...samples.map((sample) => sample.height));
  if (maxHeight - minHeight < 0.1) return 'low';
  const start = samples[0].height;
  const end = samples[samples.length - 1].height;
  if (end > start) return 'rising';
  if (end < start) return 'falling';
  return 'low';
};

const computeWindowLabel = (dayLabel: string, blockLabel: string) => `${dayLabel} • ${blockLabel}`;

const summarisePayload = (days: DayRecommendations[]): string => {
  const allWindows = days.flatMap((day) => day.windows);
  if (!allWindows.length) return 'Conditions moderate this week. Morning visits recommended.';
  const best = [...allWindows].sort((a, b) => b.overallScore - a.overallScore)[0];
  const activities = formatActivitiesList(best.activities);
  if (!activities) {
    return `${best.label}: Better for unhurried creek time.`;
  }
  return `${best.label}: ${activities} look ideal.`;
};

const run = async () => {
  const now = DateTime.now().setZone(SANS_SOUCI_TIMEZONE).startOf('hour');
  const endWindow = now.plus({ days: DAYS_TO_FETCH }).endOf('day');

  const [weather, astronomy, tide] = await Promise.all([
    fetchWeather(SANS_SOUCI_LAT, SANS_SOUCI_LNG, now, endWindow),
    fetchAstronomy(SANS_SOUCI_LAT, SANS_SOUCI_LNG, now, endWindow),
    fetchTide(SANS_SOUCI_LAT, SANS_SOUCI_LNG, now, endWindow)
  ]);

  const weatherHours = weather.map((hour) => ({ ...hour, localTime: toLocal(hour.time) }));
  const astronomyByDate = new Map(
    astronomy.map((entry) => {
      const date = toLocal(entry.time).toISODate();
      return [
        date,
        {
          sunrise: entry.sunrise ? toLocal(entry.sunrise) : null,
          sunset: entry.sunset ? toLocal(entry.sunset) : null,
          moonPhase: typeof entry.moonPhase === 'number' ? entry.moonPhase * 100 : null
        }
      ];
    })
  );
  const tideEntries = tide.map((entry) => ({ ...entry, localTime: toLocal(entry.time) }));

  const days: DayRecommendations[] = [];

  for (let index = 0; index < DAYS_TO_FETCH; index += 1) {
    const dayStart = now.startOf('day').plus({ days: index });
    const dayLabel = dayStart.toFormat('ccc, d MMM');
    const astronomyData = astronomyByDate.get(dayStart.toISODate());

    const day: DayRecommendations = {
      id: dayStart.toISODate() ?? `day-${index}`,
      date: toIsoString(dayStart),
      label: dayLabel,
      isToday: index === 0,
      isFullMoon: (astronomyData?.moonPhase ?? 0) >= 95,
      windows: []
    };

    for (const block of WINDOW_BLOCKS) {
      const windowStart = dayStart.set({ hour: block.startHour });
      const windowEnd = dayStart.set({ hour: block.endHour });
      if (windowEnd < now || windowStart > endWindow) {
        continue;
      }

      const windowWeather = weatherHours.filter(
        (hour) => hour.localTime >= windowStart && hour.localTime < windowEnd
      );

      const windSpeed = round(average(windowWeather.map((hour) => pickValue(hour.windSpeed))), 1);
      const windGust = round(average(windowWeather.map((hour) => pickValue(hour.windGust))), 1);
      const windDirection = round(
        average(windowWeather.map((hour) => pickValue(hour.windDirection))),
        0
      );
      const temperature = round(average(windowWeather.map((hour) => pickValue(hour.airTemperature))), 1);
      const precipitation = round(
        average(windowWeather.map((hour) => pickValue(hour.precipitation))),
        1
      );
      const cloudCover = round(average(windowWeather.map((hour) => pickValue(hour.cloudCover))), 0);

      const windowTide = tideEntries.filter(
        (entry) => entry.localTime >= windowStart && entry.localTime < windowEnd
      );
      const tideHeight = windowTide.length
        ? round(Math.max(...windowTide.map((entry) => entry.height)), 2)
        : null;
      const tideState = determineTideState(windowTide);

      const sunriseTime = astronomyData?.sunrise ?? null;
      const sunsetTime = astronomyData?.sunset ?? null;

      const sunriseInside = Boolean(
        sunriseTime && sunriseTime >= windowStart && sunriseTime < windowEnd
      );
      const sunsetInside = Boolean(sunsetTime && sunsetTime >= windowStart && sunsetTime < windowEnd);

      const daylight = Boolean(
        sunriseTime &&
          sunsetTime &&
          windowStart >= sunriseTime &&
          windowEnd <= sunsetTime
      );

      const metrics = {
        windSpeed,
        windGust,
        windDirection,
        temperature,
        cloudCover,
        precipitation,
        tideHeight,
        tideState,
        sunrise: sunriseInside,
        sunset: sunsetInside,
        moonPhase: astronomyData?.moonPhase ?? null,
        daylight
      };

      const activities = computeActivityScores({
        startLabel: block.label,
        dayLabel: day.label,
        blockId: block.id,
        goldenWindow: ['golden-hour', 'sunset'].includes(block.id),
        daylight,
        metrics
      });

      let overallScore = overallWindowScore(activities);
      overallScore = applyMoonPhaseBonus(overallScore, metrics);
      const rating = ratingFromScore(overallScore);

      const windowRecommendation: WindowRecommendation = {
        id: `${day.id}-${block.id}`,
        dayIndex: index,
        blockId: block.id,
        start: toIsoString(windowStart),
        end: toIsoString(windowEnd),
        label: computeWindowLabel(day.label, block.label),
        rating,
        overallScore: Math.round(overallScore),
        summary: '',
        activities,
        metrics: {
          windSpeed: metrics.windSpeed ?? 0,
          windGust: metrics.windGust ?? 0,
          windDirection: metrics.windDirection ?? 0,
          temperature: metrics.temperature ?? 0,
          cloudCover: metrics.cloudCover ?? 0,
          precipitation: metrics.precipitation ?? 0,
          tideHeight: metrics.tideHeight ?? 0,
          tideState: metrics.tideState,
          sunrise: sunriseInside,
          sunset: sunsetInside,
          moonPhase: metrics.moonPhase ?? 0
        }
      };

      windowRecommendation.summary = buildSummary(windowRecommendation);
      day.windows.push(windowRecommendation);
    }

    days.push(day);
  }

  const payload: BestTimesPayload = {
    generatedAt: toIsoString(now),
    timezone: SANS_SOUCI_TIMEZONE,
    refreshHours: REFRESH_HOURS,
    days,
    summary: summarisePayload(days)
  };

  await mkdir(path.dirname(OUTPUT_PATH), { recursive: true });
  await writeFile(OUTPUT_PATH, JSON.stringify(payload, null, 2));
  console.log(`Best times data written to ${OUTPUT_PATH}`);
};

run().catch((error) => {
  console.error('Failed to generate Best Time To Visit data');
  console.error(error);
  process.exitCode = 1;
});
