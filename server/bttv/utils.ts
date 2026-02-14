import type { ActivityScore, RatingLabel, StormglassHourValue } from './types';

export const pickValue = (value?: StormglassHourValue | null): number | null => {
  if (!value) return null;
  if (typeof value.noaa === 'number') return value.noaa;
  if (typeof value.sg === 'number') return value.sg;
  return null;
};

export const average = (values: Array<number | null | undefined>): number | null => {
  const filtered = values.filter((value): value is number => typeof value === 'number' && !Number.isNaN(value));
  if (!filtered.length) return null;
  const sum = filtered.reduce((acc, value) => acc + value, 0);
  return sum / filtered.length;
};

export const clamp = (value: number, min = 0, max = 100) => Math.min(Math.max(value, min), max);

export const round = (value: number | null, precision = 0) => {
  if (value === null) return null;
  const factor = 10 ** precision;
  return Math.round(value * factor) / factor;
};

export const ratingFromScore = (score: number): RatingLabel => {
  if (score >= 80) return 'perfect';
  if (score >= 55) return 'good';
  return 'not_ideal';
};

export const formatActivitiesList = (activities: ActivityScore[]) => {
  const high = activities.filter((activity) => activity.score >= 75);
  if (!high.length) return null;
  if (high.length === 1) return high[0].label;
  if (high.length === 2) return `${high[0].label} and ${high[1].label}`;
  return `${high[0].label}, ${high[1].label}, and others`;
};
