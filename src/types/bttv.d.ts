export type ActivityKey = 'kayaking' | 'photography' | 'leisure';
export type RatingLabel = 'perfect' | 'good' | 'not_ideal';
export interface ActivityScore {
    key: ActivityKey;
    label: string;
    score: number;
}
export interface WindowMetrics {
    windSpeed: number;
    windGust: number;
    windDirection: number;
    temperature: number;
    cloudCover: number;
    precipitation: number;
    tideHeight: number;
    tideState: 'high' | 'low' | 'rising' | 'falling';
    sunrise: boolean;
    sunset: boolean;
    moonPhase: number;
}
export interface WindowRecommendation {
    id: string;
    dayIndex: number;
    blockId: string;
    start: string;
    end: string;
    label: string;
    rating: RatingLabel;
    primaryScore: number;
    summary: string;
    activities: ActivityScore[];
    metrics: WindowMetrics;
}
export interface DayRecommendations {
    id: string;
    date: string;
    label: string;
    isToday: boolean;
    isFullMoon: boolean;
    windows: WindowRecommendation[];
}
export interface BestTimesPayload {
    generatedAt: string;
    timezone: string;
    refreshHours: number;
    days: DayRecommendations[];
    summary: string;
}
