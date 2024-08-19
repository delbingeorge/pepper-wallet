// src/components/Sidebar.js
import { Link, useLocation } from 'react-router-dom';
import '../assets/styles/sidebar.css'
import PepperWallet from '../assets/images/logo/pepper-wallet.png'
import Profile from '../assets/images/icons/user-profile.png'

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

function Sidebar() {

     const location = useLocation()

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
               <Link
                    className={`sidebar-item ${location.pathname === '/profile' ? 'active' : ''}`}
                    to="/profile"
               >
                    <img src={Profile} alt="" />
                    <span>Profile</span>
               </Link>
          </div>
     );
}

export default Sidebar;
