// JS wrapper that just re-exports the TSX router to keep Vite happy.
// This avoids drift between compiled JS and source routes.
import router from './routes.tsx';

export default router;
