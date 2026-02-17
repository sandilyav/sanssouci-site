import { DateTime } from 'luxon';
import type { AstronomyEntry, StormglassHour, TideEntry } from './types';
export declare const fetchWeather: (lat: number, lng: number, start: DateTime, end: DateTime) => Promise<StormglassHour[]>;
export declare const fetchAstronomy: (lat: number, lng: number, start: DateTime, end: DateTime) => Promise<AstronomyEntry[]>;
export declare const fetchTide: (lat: number, lng: number, start: DateTime, end: DateTime) => Promise<TideEntry[]>;
