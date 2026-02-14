import { ACTIVITY_LABELS } from './config';
import type { ActivityKey, ActivityScore, WindowRecommendation } from './types';
import { clamp, ratingFromScore } from './utils';

export type TideState = 'high' | 'low' | 'rising' | 'falling';

export interface WindowMetricsInput {
  startLabel: string;
  dayLabel: string;
  blockId: string;
  goldenWindow: boolean;
  daylight: boolean;
  metrics: {
    windSpeed: number | null;
    windGust: number | null;
    windDirection: number | null;
    temperature: number | null;
    precipitation: number | null;
    cloudCover: number | null;
    tideHeight: number | null;
    tideState: TideState;
    sunrise: boolean;
    sunset: boolean;
    moonPhase: number | null;
    daylight: boolean;
  };
}

const activityOrder: ActivityKey[] = ['kayaking', 'photography', 'dune', 'leisure'];

const scoreBuckets = (value: number | null, ranges: Array<{ max?: number; min?: number; score: number }>, fallback = 0) => {
  if (value === null) return fallback;
  for (const range of ranges) {
    const minPass = typeof range.min === 'number' ? value >= range.min : true;
    const maxPass = typeof range.max === 'number' ? value < range.max : true;
    if (minPass && maxPass) return range.score;
  }
  return fallback;
};

const kayakingScore = (metrics: WindowMetricsInput['metrics']): number => {
  const wind = scoreBuckets(metrics.windSpeed, [
    { max: 10, score: 40 },
    { min: 10, max: 15, score: 30 },
    { min: 15, max: 20, score: 15 },
    { min: 20, score: 0 }
  ], 20);

  let tide = 5;
  if (metrics.tideHeight !== null) {
    if (metrics.tideHeight >= 1.5) tide = 35;
    else if (metrics.tideHeight >= 1) tide = 20;
  }

  if (metrics.tideState === 'falling') tide *= 0.8;
  if (metrics.tideState === 'low') tide *= 0.6;

  const temperature = scoreBuckets(metrics.temperature, [
    { min: 24, max: 30, score: 10 },
    { min: 20, max: 24, score: 7 },
    { min: 30, max: 32, score: 7 },
    { min: 32, score: 3 },
    { max: 20, score: 3 }
  ], 7);

  let total = wind + tide + temperature;

  if (metrics.precipitation !== null) {
    if (metrics.precipitation > 2) total *= 0.6;
    else if (metrics.precipitation > 0) total *= 0.8;
  }

  if (!metrics.sunrise && !metrics.sunset && metrics.daylight === false) {
    total *= 0.5;
  }

  if (metrics.sunset) {
    total += 5;
  }

  return clamp(total);
};

const duneScore = (metrics: WindowMetricsInput['metrics']): number => {
  const wind = scoreBuckets(metrics.windSpeed, [
    { max: 12, score: 30 },
    { min: 12, max: 20, score: 20 },
    { min: 20, max: 25, score: 10 },
    { min: 25, score: 0 }
  ], 15);

  let tide = 15;
  switch (metrics.tideState) {
    case 'low':
      tide = 30;
      break;
    case 'falling':
      tide = 20;
      break;
    case 'high':
      tide = 10;
      break;
    default:
      tide = 15;
  }

  const temperature = scoreBuckets(metrics.temperature, [
    { min: 22, max: 30, score: 20 },
    { min: 18, max: 22, score: 12 },
    { min: 30, max: 34, score: 12 }
  ], 8);

  const cloud = scoreBuckets(metrics.cloudCover, [
    { min: 20, max: 50, score: 20 },
    { max: 20, score: 15 },
    { min: 50, max: 70, score: 12 },
    { min: 70, score: 8 }
  ], 12);

  let total = wind + tide + temperature + cloud;

  if (metrics.precipitation !== null && metrics.precipitation > 0) {
    total *= 0.7;
  }

  return clamp(total);
};

const photographyScore = (metrics: WindowMetricsInput['metrics'], goldenWindow: boolean): number => {
  let golden = 5;
  if (metrics.sunset || metrics.sunrise) golden = 40;
  else if (goldenWindow) golden = 25;

  const clouds = scoreBuckets(metrics.cloudCover, [
    { min: 20, max: 50, score: 30 },
    { max: 20, score: 20 },
    { min: 50, max: 70, score: 15 },
    { min: 70, score: 5 }
  ], 15);

  const wind = scoreBuckets(metrics.windSpeed, [
    { max: 12, score: 20 },
    { min: 12, max: 20, score: 10 },
    { min: 20, score: 0 }
  ], 10);

  let total = golden + clouds + wind;

  if (metrics.precipitation !== null && metrics.precipitation > 0) {
    total *= 0.5;
  }

  return clamp(total);
};

const leisureScore = (metrics: WindowMetricsInput['metrics']): number => {
  const wind = scoreBuckets(metrics.windSpeed, [
    { max: 10, score: 40 },
    { min: 10, max: 18, score: 30 },
    { min: 18, max: 24, score: 15 },
    { min: 24, score: 5 }
  ], 25);

  const temperature = scoreBuckets(metrics.temperature, [
    { min: 24, max: 30, score: 30 },
    { min: 20, max: 24, score: 22 },
    { min: 30, max: 34, score: 18 },
    { max: 20, score: 12 },
    { min: 34, score: 10 }
  ], 18);

  let precipitationMultiplier = 1;
  if (metrics.precipitation !== null && metrics.precipitation > 0.5) precipitationMultiplier = 0.6;
  else if (metrics.precipitation !== null && metrics.precipitation > 0) precipitationMultiplier = 0.8;

  let tideBonus = 0;
  if (metrics.tideHeight !== null && metrics.tideHeight >= 1.5) tideBonus = 10;
  else if (metrics.tideHeight !== null && metrics.tideHeight >= 1) tideBonus = 6;

  let total = (wind + temperature) * precipitationMultiplier + tideBonus;
  return clamp(total);
};

export const computeActivityScores = (input: WindowMetricsInput): ActivityScore[] => {
  const metrics = input.metrics;

  const scores: Record<ActivityKey, number> = {
    kayaking: kayakingScore(metrics),
    dune: duneScore(metrics),
    photography: photographyScore(metrics, input.goldenWindow),
    leisure: leisureScore(metrics)
  };

  // Safeguards
  if (metrics.windSpeed !== null && metrics.windSpeed > 30) {
    for (const key of Object.keys(scores) as ActivityKey[]) {
      scores[key] = Math.min(scores[key], 40);
    }
  }

  const activities: ActivityScore[] = activityOrder.map((key) => ({
    key,
    label: ACTIVITY_LABELS[key],
    score: clamp(scores[key])
  }));

  activities.sort((a, b) => b.score - a.score);
  return activities;
};

export const overallWindowScore = (activities: ActivityScore[]) => {
  if (!activities.length) return 0;
  const primary = activities[0].score;
  const others = activities.slice(1);
  const averageOthers = others.length
    ? others.reduce((total, item) => total + item.score, 0) / others.length
    : 0;
  const composite = primary * 0.7 + averageOthers * 0.3;
  return clamp(composite);
};

export const ratingFromWindow = (activities: ActivityScore[]) => ratingFromScore(overallWindowScore(activities));

export const applyMoonPhaseBonus = (score: number, metrics: WindowMetricsInput['metrics']) => {
  if (
    metrics.moonPhase !== null &&
    metrics.moonPhase >= 95 &&
    metrics.sunset &&
    metrics.tideState === 'rising'
  ) {
    return clamp(score + 5);
  }
  return score;
};

export const buildSummary = (window: WindowRecommendation) => {
  const bestActivities = window.activities.filter((activity) => activity.score >= 75);
  if (!bestActivities.length) {
    return `${window.label}: Calmer conditions, better for easy creek time.`;
  }
  const primary = bestActivities[0].label;
  const windDescription = window.metrics.windSpeed <= 12 ? 'calm wind' : `wind ${Math.round(window.metrics.windSpeed)} km/h`;
  const tideDescription = window.metrics.tideState === 'high' ? 'high tide' : `${window.metrics.tideState} tide`;
  return `${window.label}: ${primary} ready — ${tideDescription}, ${windDescription}.`;
};
