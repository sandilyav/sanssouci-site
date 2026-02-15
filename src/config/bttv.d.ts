import type { ActivityKey } from '../types/bttv';
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
export type WindowBlock = (typeof WINDOW_BLOCKS)[number];
export type WindowBlockId = WindowBlock['id'];
export declare const ACTIVITY_META: Record<ActivityKey, {
    label: string;
    icon: 'kayak' | 'camera' | 'leaf' | 'clock';
    colorVar: string;
}>;
export declare const RATING_COPY: Record<'perfect' | 'good' | 'not_ideal', {
    title: string;
    description: string;
}>;
