export var DAYS_TO_FETCH = 14;
export var REFRESH_HOURS = 6;
export var WINDOW_BLOCKS = [
    { id: 'daybreak', startHour: 6, endHour: 8, label: '6–8 AM' },
    { id: 'morning', startHour: 8, endHour: 10, label: '8–10 AM' },
    { id: 'late-morning', startHour: 10, endHour: 12, label: '10 AM–12 PM' },
    { id: 'golden-hour', startHour: 16, endHour: 18, label: '4–6 PM' },
    { id: 'sunset', startHour: 18, endHour: 20, label: '6–8 PM' }
];
export var WEATHER_PARAMS = [
    'airTemperature',
    'cloudCover',
    'precipitation',
    'windSpeed',
    'gust',
    'windDirection'
];
export var ACTIVITY_LABELS = {
    kayaking: 'Kayaking',
    // dune: 'Dune Driving', // Temporarily disabled while we tune scoring
    photography: 'Sunset Photography',
    leisure: 'Creek Leisure'
};
