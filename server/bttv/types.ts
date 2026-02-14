export type ActivityKey = 'kayaking' | 'dune' | 'photography' | 'leisure';

export type RatingLabel = 'perfect' | 'good' | 'not_ideal';

export interface StormglassHourValue {
  noaa?: number;
  sg?: number;
}

export interface StormglassHour {
  time: string;
  airTemperature?: StormglassHourValue;
  cloudCover?: StormglassHourValue;
  precipitation?: StormglassHourValue;
  windSpeed?: StormglassHourValue;
  windGust?: StormglassHourValue;
  windDirection?: StormglassHourValue;
  tide?: {
    sg?: number;
  };
}

export interface AstronomyEntry {
  time: string;
  sunrise?: string;
  sunset?: string;
  moonPhase?: number;
}

export interface TideEntry {
  time: string;
  height: number;
}

export interface ActivityScore {
  key: ActivityKey;
  label: string;
  score: number;
}

export interface WindowRecommendation {
  id: string;
  dayIndex: number;
  blockId: string;
  start: string;
  end: string;
  label: string;
  rating: RatingLabel;
  overallScore: number;
  summary: string;
  activities: ActivityScore[];
  metrics: {
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
  };
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
