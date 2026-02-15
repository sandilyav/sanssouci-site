import type { ActivityScore, RatingLabel, StormglassHourValue } from './types';
export declare const pickValue: (value?: StormglassHourValue | null) => number | null;
export declare const average: (values: Array<number | null | undefined>) => number | null;
export declare const clamp: (value: number, min?: number, max?: number) => number;
export declare const round: (value: number | null, precision?: number) => number | null;
export declare const ratingFromScore: (score: number) => RatingLabel;
export declare const formatActivitiesList: (activities: ActivityScore[]) => string | null;
