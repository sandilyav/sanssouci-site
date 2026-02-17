export const DAYS_TO_FETCH = 14;
export const REFRESH_HOURS = 6;

export const WINDOW_BLOCKS = [
  { id: 'daybreak', startHour: 6, endHour: 8, label: '6–8 AM' },
  { id: 'morning', startHour: 8, endHour: 10, label: '8–10 AM' },
  { id: 'late-morning', startHour: 10, endHour: 12, label: '10 AM–12 PM' },
  { id: 'golden-hour', startHour: 16, endHour: 18, label: '4–6 PM' },
  { id: 'sunset', startHour: 18, endHour: 20, label: '6–8 PM' }
] as const;

export const WEATHER_PARAMS = [
  'airTemperature',
  'cloudCover',
  'precipitation',
  'windSpeed',
  'gust',
  'windDirection'
];

export const ACTIVITY_LABELS = {
  kayaking: 'Kayaking',
  // dune: 'Dune Driving', // Temporarily disabled while we tune scoring
  photography: 'Sunset Photography',
  leisure: 'Creek Leisure'
} as const;

export type WindowBlock = (typeof WINDOW_BLOCKS)[number];
