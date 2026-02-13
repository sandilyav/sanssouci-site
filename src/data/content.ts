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

export const heroContent = {
  headline: 'Chennai’s creekside escape for small crews',
  subhead:
    'Sans Souci is a private Ennore Creek campus for offsites, birthdays, and creator days where you can shoot, swim, and slow down without leaving the city.',
  primaryCta: 'Explore Photo Spots',
  secondaryCta: 'Plan This Weekend',
  stats: [
    { label: 'Film shoots hosted', value: '100+' },
    { label: 'Minutes from Chennai', value: '30' },
    { label: 'Waterfront acres', value: '6' }
  ]
};

export const reelGrid = [
  { id: 'reel-1', label: 'Kayak Golden Hour', image: '/media/spot-kayak.jpg' },
  { id: 'reel-2', label: 'Bonfire Glow', image: '/media/spot-bonfire.jpg' },
  { id: 'reel-3', label: 'Birthday Jetty', image: '/media/spot-sunset.jpg' },
  { id: 'reel-4', label: 'Creek Reflections', image: '/media/hero.png' }
];

export const experiences: Experience[] = [
  {
    id: 'camping',
    name: 'Camping & Stargaze Nights',
    summary:
      'Wake up to Ennore Creek, spend the day exploring, and wind down in coastal tents with curated playlists and projection walls.',
    whyItLooksGood: 'Soft lantern pools and reflective water create natural bokeh for portrait and timelapse shots.',
    duration: 'Overnight or multi-day residencies',
    bestTime: 'Golden hour arrival, bonfire nights',
    idealFor: ['Friend crews', 'Creators on retreat', 'Birthday takeovers'],
    image: '/media/camping.png'
  },
  {
    id: 'kayaking',
    name: 'Kayaking & Paddle Boarding',
    summary:
      'Supported by Royal Madras Yacht Club mentors, the creek stays glassy for tandem paddles, SUP reels, and drone passes.',
    whyItLooksGood: 'Endless reflections plus low mangrove lines keep the horizon clean for cinematic shots.',
    duration: '60–120 minute loops',
    bestTime: 'Sunrise calm or sunset warmth',
    idealFor: ['Adventurous pairs', 'Fitness collectives', 'Micro-influencers'],
    image: '/media/kayaking.png'
  },
  {
    id: 'angling',
    name: 'Angling & Creek Drifts',
    summary:
      'Recognised by the Chennai angling community, Sans Souci sets you up with gear, guides, and chilled decks for slow filming.',
    whyItLooksGood: 'Long lenses capture silhouette movements while ripples carry highlights back to the camera.',
    duration: 'Half-day charter slots',
    bestTime: 'Early morning tide rise',
    idealFor: ['Weekend naturists', 'Father–daughter duos', 'Docu crews'],
    image: '/media/angling.png'
  },
  {
    id: 'motor',
    name: 'Motor Boating Loops',
    summary:
      'Loop the Ennore backwaters by motor launch to scout drone POVs, location-hunt, or shuttle between shoot stations.',
    whyItLooksGood: 'Wake trails carve graphic lines into the creek—perfect for top-down drone pans.',
    duration: '45-minute loops',
    bestTime: 'Late afternoon light',
    idealFor: ['Location scouts', 'Creators filming transitions'],
    image: '/media/events.png'
  },
  {
    id: 'events',
    name: 'Waterfront Events & Film Sets',
    summary:
      'From intimate acoustic sets to 200-person wrap parties, the deck system is rig-ready with power, green rooms, and boat transfers.',
    whyItLooksGood: 'Layered lighting plans + creek reflections give you depth without heavy decor.',
    duration: 'Custom itineraries',
    bestTime: 'Twilight through midnight',
    idealFor: ['Launches', 'After-movies', 'Creator festivals'],
    image: '/media/events.png'
  },
  {
    id: 'private',
    name: 'Private Offsites & Residencies',
    summary:
      'Close enough for day trips, isolated enough to feel off-grid. Bring teams for workshops, writing sprints, or wellness labs.',
    whyItLooksGood: 'Muted palettes, textured decks, and wide skies keep every slide photo-ready.',
    duration: 'Day or weekend blocks',
    bestTime: 'Weekday calm',
    idealFor: ['Studios', 'Startups', 'Wellness hosts'],
    image: '/media/hero.png'
  }
];

export const photoSpots: PhotoSpot[] = [
  {
    id: 'sunset-jetty',
    name: 'Sunset Jetty',
    bestTime: 'Golden Hour (5:20–5:50 PM)',
    tide: 'Rising tide for mirror water',
    wind: '< 12 km/h',
    angle: 'Low 35mm shot down the jetty for vanishing lines',
    reelIdea: 'Outfit transitions as the sun crosses the bridge arc',
    hashtag: '#ChennaiSunsets',
    image: '/media/spot-sunset.jpg'
  },
  {
    id: 'kayak-reflection',
    name: 'Kayak Reflection Zone',
    bestTime: 'Blue hour + sunrise',
    tide: 'Slack tide',
    wind: '< 8 km/h',
    angle: 'Drone top-down or handheld at water surface',
    reelIdea: '60s POV paddle with audio-reactive captions',
    hashtag: '#SansSouciCreek',
    image: '/media/spot-kayak.jpg'
  },
  {
    id: 'bonfire-cove',
    name: 'Bonfire Cove',
    bestTime: 'Nightfall',
    tide: 'Any',
    wind: '< 15 km/h',
    angle: 'Wide lens capturing silhouettes + sparks',
    reelIdea: 'Voice-note storytelling shot in warm light',
    hashtag: '#CreeksideNights',
    image: '/media/spot-bonfire.jpg'
  }
];

export const whySansSouci = [
  'Direct Ennore Creek access for boating, kayaking, and SUP film loops.',
  'Over 100 South Indian films and music videos shot on site—heritage locations ready for creators.',
  'Private, low-crowd property with secure parking and crew support.',
  'True golden hour every day thanks to wide western horizon—no skyline clutter.',
  'Quick strike distance: leave your desk at 4:30 PM, be rolling by 5:30 PM.',
  'Real elements—no fake décor, just sand, water, and mangroves.'
];

export const planTimeline = [
  {
    time: '15:30',
    title: 'Convoy leaves Chennai',
    detail: 'Load cameras + paddle gear. Coffee + briefing on the ride.'
  },
  {
    time: '16:15',
    title: 'Arrival + Setup',
    detail: 'Check into decks, select kayaks, test drones, and scout light.'
  },
  {
    time: '17:00',
    title: 'Adventure Layer',
    detail: 'Kayak loops, SUP races, or angling sequences while tide is mellow.'
  },
  {
    time: '17:40',
    title: 'Golden Hour Sprint',
    detail: 'Move to Sunset Jetty + Photo Trail, capture transitions + portraits.'
  },
  {
    time: '19:00',
    title: 'Dinner & Bonfire',
    detail: 'Private chef menus, acoustic sessions, and bonfire reels.'
  }
];

export const galleryImages = [
  '/media/spot-sunset.jpg',
  '/media/spot-kayak.jpg',
  '/media/spot-bonfire.jpg',
  '/media/camping.png',
  '/media/kayaking.png',
  '/media/angling.png',
  '/media/events.png',
  '/media/flyer.png'
];

export const contactInfo = {
  phones: ['+91 98403 66025', '+91 63601 94788'],
  email: 'bookings@sanssouci.in',
  address: '399, Kathivakkam High Road, Ennore, Tamil Nadu 600057'
};

export const membershipBenefits = [
  'Priority access to golden hour slots and creator residencies.',
  'Gear concierge—kayaks, SUPs, lighting rigs prepped before arrival.',
  'Weekday retreat pricing for teams under 20.',
  'Access to members-only location map and live tide dashboard (Release 1).'
];

export const weeklyEvents = [
  {
    title: 'Creator Residency Weekend',
    detail: '48-hour access with bunk tents, editing hut, and shuttle boats.'
  },
  {
    title: 'Tide-Aware Kayak Rally',
    detail: 'Guided paddle board cruise with GoPro mounts + rescue crew.'
  },
  {
    title: 'Waterfront Micro Weddings',
    detail: '50-guest ceremonies with jetty aisle + drone coverage plan.'
  }
];

export const historyCopy = [
  'Sans Souci began life in 1906 as part of Salt Bungalow, the Ennore office of the British Salt Commissioner.',
  'In 1962 the current family acquired the waterfront plot, turning it into a private picnic and film location.',
  'Over 100 South Indian films have shot on this property, with icons like Kamal Haasan and Mohan using the creekside decks.',
  'In the late 2000s the Ennore expressway split the estate into Salt Bungalow and the new Sans Souci micro-adventure campus.',
  'Today it operates as a tide-aware, creator-friendly playground balancing heritage with cinematic infrastructure.'
];

export const travelCopy = {
  promise: 'Leave office at 4:30 PM, be rolling golden hour by 5:30 PM.',
  directions:
    'Take Ennore High Road, cross the Royapuram stretch, and follow Kathivakkam High Road until the Sans Souci gate. Secure parking and crew access await inside.'
};
