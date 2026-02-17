type IconName = 'kayak' | 'dune' | 'camera' | 'leaf' | 'wind' | 'tide' | 'thermo' | 'sunrise' | 'sunset' | 'clock' | 'check';
type IconProps = {
    name: IconName;
    size?: number;
    className?: string;
    'aria-hidden'?: boolean;
};
declare const Icon: ({ name, size, className, ...rest }: IconProps) => import("react/jsx-runtime").JSX.Element;
export default Icon;
export type { IconName };
