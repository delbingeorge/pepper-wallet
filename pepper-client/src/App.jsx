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
import SplitIcon from './assets/images/icons/side-contents/split.png'
import LandingPage from './components/auth/LandingPage';
import { useRecoilState, useRecoilValue } from 'recoil';
import { authState, showModalForExpense, showModalForIncome } from './provider/RecoilStore';
import AddIncome from './components/modals/AddIncome';
import AddExpense from './components/modals/AddExpense';
import PreviousEntries from './components/PreviousEntries/PreviousEntries';

function App() {
  const authValue = useRecoilValue(authState)
  const [addIncome, setAddIncome] = useRecoilState(showModalForIncome);
  const [addExpense, setAddExpense] = useRecoilState(showModalForExpense);

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
                  <div className='quick-action-btn-div' onClick={() => setAddIncome(true)}>
                    <img src={IncomeIcon} alt="" />
                    <span>Add Income</span>
                  </div>
                  <div className='quick-action-btn-div' onClick={() => setAddExpense(true)}>
                    <img src={ExpenseIcon} alt="" />
                    <span>Add Expense</span>
                  </div>
                  {/* <div className='quick-action-btn-div' onClick={() => setAddIncome(true)}>
                    <img src={SplitIcon} alt="" />
                    <span>Add Split</span>
                  </div> */}
                </div>
                <h2>Previous entries</h2>
                <div>
                  <PreviousEntries />
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
      <div className={`slide-in-sheet ${addIncome ? 'open' : 'close'}`}>
        <AddIncome />
      </div>
      <div className={`slide-in-sheet ${addExpense ? 'open' : 'close'}`}>
        <AddExpense />
      </div>
    </div>
  );
}

export default App;
