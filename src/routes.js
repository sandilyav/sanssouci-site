import { jsx as _jsx } from "react/jsx-runtime";
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
        element: _jsx(SiteShell, {}),
        children: [
            { index: true, element: _jsx(HomePage, {}) },
            { path: '/experiences', element: _jsx(ExperiencesPage, {}) },
            { path: '/photo-spots', element: _jsx(PhotoSpotsPage, {}) },
            { path: '/plan', element: _jsx(PlanVisitPage, {}) },
            { path: '/events', element: _jsx(EventsPage, {}) },
            { path: '/gallery', element: _jsx(GalleryPage, {}) },
            { path: '/about', element: _jsx(AboutPage, {}) },
            { path: '/location', element: _jsx(LocationPage, {}) },
            { path: '/contact', element: _jsx(ContactPage, {}) }
        ]
    }
]);
export default router;
