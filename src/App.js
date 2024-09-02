import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MiniChart from './components/MiniChart';
import Topbar from './components/Topbar';
import Sidebar from './components/Sidebar';
 

function App() {
  return (
    <Router>
      {/* <div style={{ display: 'flex', justifyContent: 'center', padding: '50px' }}>
            <MiniChart symbol="AAPL" /> 
        </div> */}
        <Sidebar/>
        
    </Router>
  );
}

export default App;
