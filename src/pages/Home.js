// JS wrapper that just re-exports the TSX HomePage to keep Vite happy.
// This avoids drift between compiled JS and source component while
// routes still import from './pages/Home'.
import HomePage from './Home.tsx';

export default HomePage;
