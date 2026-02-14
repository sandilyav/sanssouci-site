import 'dotenv/config';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

import { DateTime } from 'luxon';

import { SANS_SOUCI_LAT, SANS_SOUCI_LNG, SANS_SOUCI_TIMEZONE } from '../../src/config/location';
import { DAYS_TO_FETCH, REFRESH_HOURS, WINDOW_BLOCKS } from './config';
import type { BestTimesPayload, DayRecommendations, TideEntry, WindowRecommendation } from './types';
import { applyMoonPhaseBonus, buildSummary, computeActivityScores, type TideState } from './scoring';
import { formatActivitiesList, ratingFromScore } from './utils';

const OUTPUT_PATH = path.resolve(process.cwd(), 'public/data/best-times.json');

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
  const best = [...allWindows].sort((a, b) => b.primaryScore - a.primaryScore)[0];
  const activities = formatActivitiesList(best.activities);
  if (!activities) {
    return `${best.label}: Better for unhurried creek time.`;
  }
  return `${best.label}: ${activities} look ideal.`;
};

const run = async () => {
  const now = DateTime.now().setZone(SANS_SOUCI_TIMEZONE).startOf('hour');
  const endWindow = now.plus({ days: DAYS_TO_FETCH }).endOf('day');

  console.log('Generating BTTV data from synthetic weather/tide inputs for layout testing.');

  const days: DayRecommendations[] = [];

  for (let index = 0; index < DAYS_TO_FETCH; index += 1) {
    const dayStart = now.startOf('day').plus({ days: index });
    const dayLabel = dayStart.toFormat('ccc, d MMM');
    const sunriseTime = dayStart.set({ hour: 6, minute: 5 + (index % 4) * 4 });
    const sunsetTime = dayStart.set({ hour: 18, minute: 5 - (index % 3) * 3 });
    const moonPhase = (index * 9) % 100;

    const day: DayRecommendations = {
      id: dayStart.toISODate() ?? `day-${index}`,
      date: toIsoString(dayStart),
      label: dayLabel,
      isToday: index === 0,
      isFullMoon: moonPhase >= 95,
      windows: []
    };

    for (let blockIndex = 0; blockIndex < WINDOW_BLOCKS.length; blockIndex += 1) {
      const block = WINDOW_BLOCKS[blockIndex];
      const windowStart = dayStart.set({ hour: block.startHour });
      const windowEnd = dayStart.set({ hour: block.endHour });
      if (windowEnd < now || windowStart > endWindow) {
        continue;
      }

      const windSpeed = Math.max(4, Math.min(28, 8 + blockIndex * 2 + ((index % 5) - 2) * 1.5));
      const windGust = windSpeed + 3 + (blockIndex % 2);
      const windDirection = (65 + index * 18 + blockIndex * 22) % 360;
      const temperature = 24 + blockIndex * 1.8 + ((index + 1) % 4) * 0.6;
      const precipitation = blockIndex === 3 && index % 3 === 0 ? 1.2 : blockIndex === 4 && index % 4 === 0 ? 0.6 : 0;
      const cloudCover = Math.max(8, Math.min(85, 18 + blockIndex * 11 + (index % 6) * 4));

      const tideSamples: TideEntry[] = [
        { time: toIsoString(windowStart), height: 0.85 + ((index + blockIndex) % 5) * 0.2 },
        { time: toIsoString(windowStart.plus({ hour: 1 })), height: 0.95 + ((index + blockIndex + 2) % 5) * 0.2 }
      ];
      const tideHeight = Math.max(...tideSamples.map((entry) => entry.height));
      const tideState = determineTideState(tideSamples);

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
        moonPhase,
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
      const [primary, ...otherActivities] = activities;
      const boostedPrimaryScore = applyMoonPhaseBonus(primary.score, metrics);
      const rating = ratingFromScore(boostedPrimaryScore);
      const adjustedActivities = [{ ...primary, score: boostedPrimaryScore }, ...otherActivities];

      const windowRecommendation: WindowRecommendation = {
        id: `${day.id}-${block.id}`,
        dayIndex: index,
        blockId: block.id,
        start: toIsoString(windowStart),
        end: toIsoString(windowEnd),
        label: computeWindowLabel(day.label, block.label),
        rating,
        primaryScore: Math.round(boostedPrimaryScore),
        summary: '',
        activities: adjustedActivities,
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
  await writeFile(OUTPUT_PATH, JSON.stringify(payload, null, 2), 'utf8');
  console.log(`Best times generated at ${OUTPUT_PATH}`);
};

run().catch((error) => {
  console.error('Failed to generate Best Time To Visit data');
  console.error(error);
  process.exitCode = 1;
});
