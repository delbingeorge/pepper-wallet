import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './components/Dashboard';
import Transactions from './components/Transactions';
import Statistic from './components/Statistic';
import Settings from './components/Settings';
import Profile from './components/Profile';
import Sidebar from './navigation/Sidebar';

function App() {
  return (
    <div className="container">
      <Router>
        <Sidebar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/stat" element={<Statistic />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
        <div></div>
      </Router>
    </div>
  );
}

export default App;
