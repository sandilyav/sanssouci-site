export declare const DAYS_TO_FETCH = 14;
export declare const REFRESH_HOURS = 6;
export declare const WINDOW_BLOCKS: readonly [{
    readonly id: "daybreak";
    readonly startHour: 6;
    readonly endHour: 8;
    readonly label: "6–8 AM";
}, {
    readonly id: "morning";
    readonly startHour: 8;
    readonly endHour: 10;
    readonly label: "8–10 AM";
}, {
    readonly id: "late-morning";
    readonly startHour: 10;
    readonly endHour: 12;
    readonly label: "10 AM–12 PM";
}, {
    readonly id: "golden-hour";
    readonly startHour: 16;
    readonly endHour: 18;
    readonly label: "4–6 PM";
}, {
    readonly id: "sunset";
    readonly startHour: 18;
    readonly endHour: 20;
    readonly label: "6–8 PM";
}];
export declare const WEATHER_PARAMS: string[];
export declare const ACTIVITY_LABELS: {
    readonly kayaking: "Kayaking";
    readonly photography: "Sunset Photography";
    readonly leisure: "Creek Leisure";
};
export type WindowBlock = (typeof WINDOW_BLOCKS)[number];
