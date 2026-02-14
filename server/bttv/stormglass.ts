import { DateTime } from 'luxon';

import { WEATHER_PARAMS } from './config';
import type { AstronomyEntry, StormglassHour, TideEntry } from './types';

const API_BASE = 'https://api.stormglass.io/v2';
const SOURCE = 'noaa';

const toUnixSeconds = (date: DateTime) => Math.floor(date.toSeconds());

type WeatherResponse = {
  hours: StormglassHour[];
};

type AstronomyResponse = {
  data: AstronomyEntry[];
};

type TideResponse = {
  data: { time: string; height: number }[];
};

const ensureEnv = (value: string | undefined, name: string) => {
  if (!value) {
    throw new Error(`Missing required env var ${name}`);
  }
  return value;
};

const fetchStormglass = async <T>(path: string, query: Record<string, string>, apiKey: string) => {
  const url = new URL(`${API_BASE}${path}`);
  Object.entries(query).forEach(([key, val]) => url.searchParams.set(key, val));

  const response = await fetch(url, {
    headers: { Authorization: apiKey }
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Stormglass ${path} failed: ${response.status} ${response.statusText} – ${body}`);
  }

  return (await response.json()) as T;
};

export const fetchWeather = async (
  lat: number,
  lng: number,
  start: DateTime,
  end: DateTime
) => {
  const apiKey = ensureEnv(process.env.STORMGLASS_API_KEY, 'STORMGLASS_API_KEY');

  const data = await fetchStormglass<WeatherResponse>(
    '/weather/point',
    {
      lat: lat.toString(),
      lng: lng.toString(),
      params: WEATHER_PARAMS.join(','),
      source: SOURCE,
      start: toUnixSeconds(start).toString(),
      end: toUnixSeconds(end).toString()
    },
    apiKey
  );

  return data.hours;
};

export const fetchAstronomy = async (
  lat: number,
  lng: number,
  start: DateTime,
  end: DateTime
) => {
  const apiKey = ensureEnv(process.env.STORMGLASS_API_KEY, 'STORMGLASS_API_KEY');

  const data = await fetchStormglass<AstronomyResponse>(
    '/astronomy/point',
    {
      lat: lat.toString(),
      lng: lng.toString(),
      start: toUnixSeconds(start).toString(),
      end: toUnixSeconds(end).toString()
    },
    apiKey
  );

  return data.data;
};

export const fetchTide = async (lat: number, lng: number, start: DateTime, end: DateTime) => {
  const apiKey = ensureEnv(process.env.STORMGLASS_API_KEY, 'STORMGLASS_API_KEY');

  const data = await fetchStormglass<TideResponse>(
    '/tide/sea-level/point',
    {
      lat: lat.toString(),
      lng: lng.toString(),
      start: toUnixSeconds(start).toString(),
      end: toUnixSeconds(end).toString()
    },
    apiKey
  );

  const tideEntries: TideEntry[] = data.data.map((entry) => ({
    time: entry.time,
    height: entry.height
  }));

  return tideEntries;
};
