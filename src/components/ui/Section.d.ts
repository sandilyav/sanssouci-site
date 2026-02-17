import { ReactNode } from 'react';
type SectionProps = {
    eyebrow: string;
    title: string;
    subtitle?: string;
    children: ReactNode;
    id?: string;
};
declare const Section: ({ eyebrow, title, subtitle, children, id }: SectionProps) => import("react/jsx-runtime").JSX.Element;
export default Section;
