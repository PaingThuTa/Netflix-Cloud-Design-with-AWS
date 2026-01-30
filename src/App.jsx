import { Navigate, Route, Routes } from 'react-router-dom';
import CatalogPage from './pages/CatalogPage.jsx';
import WatchPage from './pages/WatchPage.jsx';

const App = () => (
  <Routes>
    <Route path="/" element={<CatalogPage />} />
    <Route path="/watch/:id" element={<WatchPage />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default App;
