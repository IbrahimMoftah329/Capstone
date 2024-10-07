import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Correct the import
import Home from './pages/HomePage/Home';
import About from './pages/AboutPage/About';
import Profile from './pages/ProfilePage/Profile';
import Dashboard from './pages/DashboardPage/Dashboard';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

