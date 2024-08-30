import './App.css';
import Sidebar from './components/Sidebar';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
 

function App() {
  return (
    <Router>
      <Sidebar/>
    </Router>
  );
}

export default App;
