// src/components/Sidebar.js
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../assets/styles/sidebar.css'
import PepperWallet from '../assets/images/logo/pepper-wallet.png'
import CloseIcon from '../assets/images/icons/action-icon/close.png'

// Outline Icon imports
import DashboardIcon from '../assets/images/icons/sidebar-icons/dashboard-outline.png'
import WalletIcon from '../assets/images/icons/sidebar-icons/wallet-outline.png'
import StatIcon from '../assets/images/icons/sidebar-icons/graph-outline.png'
import GearIcon from '../assets/images/icons/sidebar-icons/gear-outline.png'

// Solid Icon imports
import DashboardSolid from '../assets/images/icons/sidebar-icons/dashboard-solid.png'
import WalletSolid from '../assets/images/icons/sidebar-icons/wallet-solid.png'
import StatSolid from '../assets/images/icons/sidebar-icons/graph-solid.png'
import GearSolid from '../assets/images/icons/sidebar-icons/gear-solid.png'
import { authState, userInfo } from '../provider/RecoilStore';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import { useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';

function Sidebar() {
     const location = useLocation();
     const navigation = useNavigate();
     const [showModal, setShowModal] = useState(false)
     const [authValue, setAuthValue] = useRecoilState(authState);
     const [userValue, setUserValue] = useRecoilState(userInfo)
     const signOutUser = async () => {
          try {
               await signOut(auth)
               setAuthValue(false)
               setUserValue(false)
               navigation('/')
          } catch (error) {
               console.log(error)
          }
     }

     return (
          <div className="sidebar">
               <div>
                    <div className='sidebar-header'>
                         <Link to={'/dashboard'} >
                              <img src={PepperWallet} alt="" />
                         </Link>
                    </div>
                    <div className='sidebar-item-container'>
                         <Link
                              className={`sidebar-item ${location.pathname === '/dashboard' ? 'active' : ''}`}
                              to="/dashboard"
                         >
                              <img src={location.pathname === '/dashboard' ? DashboardSolid : DashboardIcon} alt="" />
                              <span>Dashboard</span>
                         </Link>
                         <Link
                              className={`sidebar-item ${location.pathname === '/transactions' ? 'active' : ''}`}
                              to="/transactions"
                         >
                              <img src={location.pathname === '/transactions' ? WalletSolid : WalletIcon} alt="" />
                              <span>Transactions</span>
                         </Link>
                         <Link
                              className={`sidebar-item ${location.pathname === '/stat' ? 'active' : ''}`}
                              to="/stat"
                         >
                              <img src={location.pathname === '/stat' ? StatSolid : StatIcon} alt="" />
                              <span>Statistic</span>
                         </Link>
                         <Link
                              className={`sidebar-item ${location.pathname === '/settings' ? 'active' : ''}`}
                              to="/settings"
                         >
                              <img src={location.pathname === '/settings' ? GearSolid : GearIcon} alt="" />
                              <span>Settings</span>
                         </Link>
                    </div>
               </div>

               <div className={`sidebar-item ${location.pathname === '/profile' ? 'active' : ''}`} onClick={() => { setShowModal(true); }}>
                    <img className='profile-image' src={userValue.photoURL} alt="" />
                    <span>{userValue.displayName}</span>
               </div>

               <div className={`slide-in-sheet ${showModal ? 'open' : 'close'}`}>
                    <div className='sheet-content'>
                         <div className='sheet-head'>
                              <h1>Profile Management</h1>
                              <img className='head-action-close' src={CloseIcon} alt="" onClick={() => { setShowModal(false) }} />
                         </div>
                         <div className='profile-content'>
                              <img src={userValue.photoURL} alt="" />
                              <h2>{userValue.displayName}</h2>
                              <h3>{userValue.email}</h3>
                         </div>
                         <button onClick={() => { signOutUser() }}>signout</button>
                    </div>
               </div>
          </div>
     );
}

export default Sidebar;
