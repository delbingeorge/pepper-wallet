import React from 'react'
import PepperWallet from '../../assets/images/logo/pepper-wallet.png'
import SignIn from './SignIn'
import SignUp from './SignUp'

const LandingPage = () => {
     return (
          <div className='landing-container'>
               <div className='image-container'>
                    <img src={PepperWallet} alt="" />
                    <div className='content-container-auth'>
                         <h1>Before it was chaos,
                              <br />
                              now its pepper!
                         </h1>
                         <p>Pepper is a expense tracker for managing all the expenses.</p>
                    </div>
               </div>
               <div className='auth-container'>
                    <div className='auth-head'>
                         <h1>Create an account</h1>
                         <h2>Join Pepper</h2>
                    </div>
                    <form>
                         <input type="text" />
                    </form>
               </div>
          </div>
     )
}

export default LandingPage
