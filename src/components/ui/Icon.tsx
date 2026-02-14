type IconName =
  | 'kayak'
  | 'dune'
  | 'camera'
  | 'leaf'
  | 'wind'
  | 'tide'
  | 'thermo'
  | 'sunrise'
  | 'sunset'
  | 'clock'
  | 'check';

type IconProps = {
  name: IconName;
  size?: number;
  className?: string;
  'aria-hidden'?: boolean;
};

const paths: Record<IconName, JSX.Element> = {
  kayak: (
    <>
      <path d="M4 12c4-4.5 12-4.5 16 0" />
      <path d="M12 6v12" />
      <path d="M2 12h20" />
    </>
  ),
  dune: (
    <>
      <path d="M3 16s3-4 9-4 9 4 9 4" />
      <path d="M2 19h20" />
      <path d="M8 11l2-3 2 3" />
    </>
  ),
  camera: (
    <>
      <rect x="4" y="6" width="16" height="12" rx="3" />
      <circle cx="12" cy="12" r="3.5" />
      <path d="M9 4h6l1 2" />
    </>
  ),
  leaf: (
    <>
      <path d="M5 19c7.5 0 14-6.5 14-14" />
      <path d="M5 19c0-7.5 6.5-14 14-14" />
    </>
  ),
  wind: (
    <>
      <path d="M3 10h10a3 3 0 1 0-3-3" />
      <path d="M5 16h9a3 3 0 1 1-3 3" />
    </>
  ),
  tide: (
    <>
      <path d="M2 12c2-2 4-2 6 0s4 2 6 0 4-2 6 0" />
      <path d="M4 16c2-2 4-2 6 0s4 2 6 0 4-2 6 0" />
    </>
  ),
  thermo: (
    <>
      <path d="M12 3a2 2 0 0 0-2 2v7.5a4 4 0 1 0 4 0V5a2 2 0 0 0-2-2z" />
      <path d="M12 9v6" />
    </>
  ),
  sunrise: (
    <>
      <path d="M12 5v5" />
      <path d="M8 10l4-4 4 4" />
      <path d="M4 18h16" />
      <path d="M6 15h1" />
      <path d="M17 15h1" />
    </>
  ),
  sunset: (
    <>
      <path d="M12 19v-5" />
      <path d="M8 14l4 4 4-4" />
      <path d="M4 18h16" />
      <path d="M6 15h1" />
      <path d="M17 15h1" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="7" />
      <path d="M12 8v4l2 2" />
    </>
  ),
  check: (
    <>
      <path d="M5 12.5 10 17l9-10" />
    </>
  )
};

const Icon = ({ name, size = 20, className, ...rest }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...rest}
  >
    {paths[name]}
  </svg>
);

export default Icon;
export type { IconName };
