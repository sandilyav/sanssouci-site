import { createBrowserRouter } from 'react-router-dom';

import SiteShell from './components/layout/SiteShell';
import HomePage from './pages/Home';
import ExperiencesPage from './pages/Experiences';
import PhotoSpotsPage from './pages/PhotoSpots';
import PlanVisitPage from './pages/PlanVisit';
import EventsPage from './pages/Events';
import GalleryPage from './pages/Gallery';
import AboutPage from './pages/About';
import LocationPage from './pages/Location';
import ContactPage from './pages/Contact';

const router = createBrowserRouter([
  {
    path: '/',
    element: <SiteShell />,
    children: [
      { index: true, element: <HomePage /> },
      { path: '/experiences', element: <ExperiencesPage /> },
      { path: '/photo-spots', element: <PhotoSpotsPage /> },
      { path: '/plan', element: <PlanVisitPage /> },
      { path: '/events', element: <EventsPage /> },
      { path: '/gallery', element: <GalleryPage /> },
      { path: '/about', element: <AboutPage /> },
      { path: '/location', element: <LocationPage /> },
      { path: '/contact', element: <ContactPage /> }
    ]
  }
]);

export default router;
