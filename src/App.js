import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Markets from './Pages/Markets';
import Wallet from './Pages/Wallet';
import Stock from './Pages/Stock';
import Login from './Pages/Login';
import TradingBots from './Pages/TradingBots';
import SettingsPage from './Pages/Settings';
import Signup from './Pages/Signup';
import AdminPage from './Pages/Admin';
import PrivateRoute from './utils/PrivateRoute'; // Import PrivateRoute
import TopNav from './components/TopNav';

function App() {
  return (
    <Router>
      <MainApp />
    </Router>
  );
}

function MainApp() {
  const location = useLocation(); // Get the current route location

  // Define the routes where TopNav should not be shown
  const hideTopNavPaths = ['/login', '/signup'];

  return (
    <>
      <Sidebar />
      {/* Conditionally render TopNav based on current route */}
      {!hideTopNavPaths.includes(location.pathname) && <TopNav />}

      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        {/* Private Routes */}
        <Route 
          path="/Markets" 
          element={
              <Markets />
          } 
        />
        <Route 
          path="/Wallet" 
          element={
            <PrivateRoute>
              <Wallet />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/Stock/:symbol" 
          element={
            <PrivateRoute>
              <Stock />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/AI-bots" 
          element={
            <PrivateRoute>
              <TradingBots />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/Settings" 
          element={
            <PrivateRoute>
              <SettingsPage />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/admin" 
          element={
            <PrivateRoute>
              <AdminPage />
            </PrivateRoute>
          } 
        />

        {/* Redirect any unknown routes to /Markets if authenticated or to /login if not */}
        <Route 
          path="*" 
          element={
            <PrivateRoute>
              <Navigate to="/Markets" />
            </PrivateRoute>
          } 
        />
      </Routes>
    </>
  );
}

export default App;
