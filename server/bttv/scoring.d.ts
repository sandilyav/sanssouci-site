import type { ActivityScore, WindowRecommendation } from './types';
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
export declare const computeActivityScores: (input: WindowMetricsInput) => ActivityScore[];
export declare const applyMoonPhaseBonus: (score: number, metrics: WindowMetricsInput["metrics"]) => number;
export declare const buildSummary: (window: WindowRecommendation) => string;
