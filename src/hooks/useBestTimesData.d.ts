import type { BestTimesPayload } from '../types/bttv';
export declare const useBestTimesData: () => {
    data: BestTimesPayload | null;
    loading: boolean;
    error: string | null;
};
