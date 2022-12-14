import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import icon from '../../assets/icon.svg';
import './App.css';
import MediaPlayer from './pages/player';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MediaPlayer />} />
      </Routes>
    </Router>
  );
}
