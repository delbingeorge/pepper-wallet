import React from 'react'
import PepperWallet from '../../assets/images/logo/pepper-wallet.png'
import GoogleIcon from '../../assets/images/icons/login-icon/google-icon.png'

const LandingPage = () => {
     return (
          <div className='landing-container'>
               <div className='image-container'>
                    <img className='app-icon' src={PepperWallet} alt="" />
                    <div className='content-container-auth'>
                         <h1>Before it was chaos,
                              <br />
                              now its pepper!
                         </h1>
                         <p>Pepper is a expense tracker for managing all the expenses.</p>
                         <div className='auth-btn'>
                              <img className='auth-icon' src={GoogleIcon} alt="" />
                              <span>Continue with Google</span>
                         </div>
                    </div>
               </div>
          </div>
     )
}

export default LandingPage
