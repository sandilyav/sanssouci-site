export type Experience = {
    id: string;
    name: string;
    summary: string;
    whyItLooksGood: string;
    duration: string;
    bestTime: string;
    idealFor: string[];
    image: string;
};
export type PhotoSpot = {
    id: string;
    name: string;
    bestTime: string;
    tide: string;
    wind: string;
    angle: string;
    reelIdea: string;
    hashtag: string;
    image: string;
};
export declare const heroContent: {
    headline: string;
    subhead: string;
    primaryCta: string;
    secondaryCta: string;
    stats: {
        label: string;
        value: string;
    }[];
};
export declare const placeProof: {
    title: string;
    detail: string;
}[];
export declare const laneChoices: {
    id: string;
    title: string;
    summary: string;
    cta: string;
    to: string;
}[];
export declare const adventureFlow: string[];
export declare const photoFlow: string[];
export declare const experiencePracticals: string[];
export declare const photoSpotGuidelines: string[];
export declare const reelGrid: {
    id: string;
    label: string;
    image: string;
}[];
export declare const experiences: Experience[];
export declare const photoSpots: PhotoSpot[];
export declare const whySansSouci: string[];
export declare const planTimeline: {
    time: string;
    title: string;
    detail: string;
}[];
export declare const galleryImages: string[];
export declare const contactInfo: {
    phones: string[];
    email: string;
    address: string;
};
export declare const membershipBenefits: string[];
export declare const weeklyEvents: {
    title: string;
    detail: string;
}[];
export declare const historyCopy: string[];
export declare const travelCopy: {
    promise: string;
    directions: string;
};
