import { Navigate, Route, Routes } from 'react-router-dom';
import CatalogPage from './pages/CatalogPage.jsx';
import WatchPage from './pages/WatchPage.jsx';
import HistoryPage from './pages/HistoryPage.jsx';

const App = () => (
  <Routes>
    <Route path="/" element={<CatalogPage />} />
    <Route path="/watch/:id" element={<WatchPage />} />
    <Route path="/history" element={<HistoryPage />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default App;
