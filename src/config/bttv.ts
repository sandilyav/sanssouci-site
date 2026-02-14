import type { ActivityKey } from '../types/bttv';

export const WINDOW_BLOCKS = [
  { id: 'daybreak', startHour: 6, endHour: 8, label: '6–8 AM' },
  { id: 'morning', startHour: 8, endHour: 10, label: '8–10 AM' },
  { id: 'late-morning', startHour: 10, endHour: 12, label: '10 AM–12 PM' },
  { id: 'golden-hour', startHour: 16, endHour: 18, label: '4–6 PM' },
  { id: 'sunset', startHour: 18, endHour: 20, label: '6–8 PM' }
] as const;

export type WindowBlock = (typeof WINDOW_BLOCKS)[number];
export type WindowBlockId = WindowBlock['id'];

export const ACTIVITY_META: Record< ActivityKey, { label: string; icon: 'kayak' | 'dune' | 'camera' | 'leaf' } > = {
  kayaking: { label: 'Kayaking', icon: 'kayak' },
  dune: { label: 'Dune Driving', icon: 'dune' },
  photography: { label: 'Sunset Photography', icon: 'camera' },
  leisure: { label: 'Creek Leisure', icon: 'leaf' }
};

export const RATING_COPY: Record< 'perfect' | 'good' | 'not_ideal', { title: string; description: string } > = {
  perfect: { title: 'Perfect', description: 'Everything lines up—plan around this window.' },
  good: { title: 'Good', description: 'Decent light and water. Flexible plans thrive.' },
  not_ideal: { title: 'Not ideal', description: 'Usable but not our first pick.' }
};
