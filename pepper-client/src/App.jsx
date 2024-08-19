import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './components/Dashboard';
import Transactions from './components/Transactions';
import Statistic from './components/Statistic';
import Settings from './components/Settings';
import Profile from './components/Profile';
import Sidebar from './navigation/Sidebar';
import CloseIcon from './assets/images/icons/action-icon/close.png'
import IncomeLogo from './assets/images/icons/essential-icons/star-struck.png'

// Image import
import IncomeIcon from './assets/images/icons/side-contents/income.png'
import ExpenseIcon from './assets/images/icons/side-contents/expense.png'
import LandingPage from './components/auth/LandingPage';
import { useRecoilState, useRecoilValue } from 'recoil';
import { authState, userInfo } from './provider/RecoilStore';
import { useState } from 'react';

function App() {
  const authValue = useRecoilValue(authState)
  const [userValue, setUserValue] = useRecoilState(userInfo)
  const [addIncome, setAddIncome] = useState(false)

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
      <div className={`slide-in-sheet ${addIncome ? 'open' : 'close'}`}>
        <div className='sheet-content'>
          <div className='sheet-head'>
            <div>
              <img className='sheet-head-icon' src={IncomeLogo} alt="" onClick={() => { setAddIncome(false) }} />
              <h1>Add Income</h1>
            </div>
            <img className='head-action-close' src={CloseIcon} alt="" onClick={() => { setAddIncome(false) }} />
          </div>
          <form className='add-income-form'>
            <div className='input-field'>
              <label className='input-label' htmlFor="income-title">Title</label>
              <input type="text" id='income-title' />
            </div>
            <div className='input-field'>
              <label className='input-label' htmlFor="income-description">Description {"(optional)"}</label>
              <textarea name="income-description" id="income-description"></textarea>
            </div>
            <div className='input-field'>
              <label className='input-label' htmlFor="income-amount">Amount</label>
              <input type="number" id='income-title' />
            </div>
            <div className='input-field'>
              <label className='input-label' htmlFor="income-date">Date of transaction</label>
              <input type="date" id='income-date' />
            </div>
            {/* <div className='input-category'>
              <span className='category-span'>Food</span>
              <span className='category-span'>Grocery</span>
              <span className='category-span'>Fuel</span>
              <span className='category-span'>Salary</span>
              <span className='category-span'>Freelancing</span>
              <span className='category-span'>Investments</span>
              <span className='category-span'>Gifts</span>
              <span className='category-span'>Rental Income</span>
            </div> */}
            <div className='form-submit-container'>
              <input className='form-submit' type="submit" value="Add Income" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
