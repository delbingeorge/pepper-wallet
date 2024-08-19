import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './components/Dashboard';
import Transactions from './components/Transactions';
import Statistic from './components/Statistic';
import Settings from './components/Settings';
import Profile from './components/Profile';
import Sidebar from './navigation/Sidebar';

// Image import
import IncomeIcon from './assets/images/icons/side-contents/income.png'
import ExpenseIcon from './assets/images/icons/side-contents/expense.png'
import LandingPage from './components/auth/LandingPage';
import { useRecoilState, useRecoilValue } from 'recoil';
import { authState, userInfo } from './provider/RecoilStore';

function App() {
  const authValue = useRecoilValue(authState)
  const [userValue, setUserValue] = useRecoilState(userInfo)

  return (
    <div className="container">
      <Router>
        {
          authValue ?
            <>
              <Sidebar />
              <div className="content">
                <Routes>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/transactions" element={<Transactions />} />
                  <Route path="/stat" element={<Statistic />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/" element={<Navigate to="/dashboard" />} />
                </Routes>
              </div>
              <div className='side-contents'>
                <h1>Quick actions</h1>
                <div className='quick-action'>
                  <div className='quick-action-btn-div'>
                    <img src={IncomeIcon} alt="" />
                    <span>Add Income</span>
                  </div>
                  <div className='quick-action-btn-div'>
                    <img src={ExpenseIcon} alt="" />
                    <span>Add Income</span>
                  </div>
                </div>
                <h1>Previous entries</h1>
                <div>
                  <div>

                  </div>
                </div>
              </div>
            </>
            : <>
              <Routes>
                <Route path="*" element={<Navigate to="/" />} />
                <Route path="/" element={<LandingPage />} />
              </Routes>
            </>
        }
      </Router>
    </div>
  );
}

export default App;
