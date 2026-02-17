export var WINDOW_BLOCKS = [
    { id: 'daybreak', startHour: 6, endHour: 8, label: '6–8 AM' },
    { id: 'morning', startHour: 8, endHour: 10, label: '8–10 AM' },
    { id: 'late-morning', startHour: 10, endHour: 12, label: '10 AM–12 PM' },
    { id: 'golden-hour', startHour: 16, endHour: 18, label: '4–6 PM' },
    { id: 'sunset', startHour: 18, endHour: 20, label: '6–8 PM' }
];
export var ACTIVITY_META = {
    kayaking: { label: 'Kayaking', icon: 'kayak', colorVar: '--color-activity-kayak' },
    photography: { label: 'Photography', icon: 'camera', colorVar: '--color-activity-photography' },
    leisure: { label: 'Creek Leisure', icon: 'clock', colorVar: '--color-activity-leisure' }
};
export var RATING_COPY = {
    perfect: { title: 'Perfect', description: 'Everything lines up—plan around this window.' },
    good: { title: 'Good', description: 'Decent light and water. Flexible plans thrive.' },
    not_ideal: { title: 'Not ideal', description: 'Usable but not our first pick.' }
};
