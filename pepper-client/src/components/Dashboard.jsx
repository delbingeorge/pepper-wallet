import React from 'react'
import { useRecoilValue } from 'recoil';
import { userTransactions } from '../provider/RecoilStore';

import PepperWallet from '../assets/images/logo/pepper-wallet.png'
import MonkeyHear from '../assets/images/icons/casual-icon/hear-no-evil-monkey.gif'
import MonkeySee from '../assets/images/icons/casual-icon/see-no-evil-monkey.gif'
import MonkeySpeak from '../assets/images/icons/casual-icon/speak-no-evil-monkey.gif'

const Dashboard = () => {
     const allTransactions = useRecoilValue(userTransactions)
     return (
          <div className='content-container'>
               <div className='content-head'>
                    <h1>Dashboard</h1>
                    <h2></h2>
               </div>
               <div className='get-started'>
                    <div className='get-started-head'>
                         <h3>Welcome to</h3>
                         <img src={PepperWallet} alt="" />
                         <p>A personal expense tracker is a user-friendly tool designed to help individuals monitor and manage their finances efficiently.</p>
                    </div>
                    <div className='get-started-side'>
                         <img className='casual-monkey-icon' src={MonkeySee} alt="" />
                         <img className='casual-monkey-icon' src={MonkeyHear} alt="" />
                         <img className='casual-monkey-icon' src={MonkeySpeak} alt="" />
                    </div>
               </div>
               {/* 
               <div>
                    <div>
                         <div>
                              <img src={MonkeyHear} alt="" />
                         </div>
                         <div><h1>Groceries</h1></div>
                    </div>
               </div> 
               */}
          </div>
     )
}

export default Dashboard
