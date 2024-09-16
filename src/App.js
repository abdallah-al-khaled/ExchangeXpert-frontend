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
 

function App() {
  return (
    <Router>
        <Sidebar/>
        <Routes>
          <Route path="/Markets" element={<Markets />} />
          <Route path="/Wallet" element={<Wallet />} />
          <Route path="/Stock/:symbol" element={<Stock />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/AI-bots" element={<TradingBots/>} />
          <Route path="/Settings" element={<Settings/>} />
        </Routes>
    </Router>
  );
}

export default App;
