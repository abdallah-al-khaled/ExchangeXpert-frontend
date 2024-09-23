import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MiniChart from './components/MiniChart';
import Topbar from './components/Topbar';
import Sidebar from './components/Sidebar';
import TopNav from './components/TopNav';
import TopContainer from './components/TopContainer';
import Markets from './Pages/Markets';
import Wallet from './Pages/Wallet';
import Stock from './Pages/Stock';
import Login from './Pages/Login';
import TradingBots from './Pages/TradingBots';
import { Settings } from '@mui/icons-material';
import SettingsPage from './Pages/Settings';
import Signup from './Pages/Signup';
import AdminPage from './Pages/Admin';
 

function App() {
  return (
    <Router>
        <Sidebar/>
        <Routes>
          <Route path="/Markets" element={<Markets />} />
          <Route path="/Wallet" element={<Wallet />} />
          <Route path="/Stock/:symbol" element={<Stock />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/AI-bots" element={<TradingBots/>} />
          <Route path="/Settings" element={<SettingsPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
    </Router>
  );
}

export default App;
