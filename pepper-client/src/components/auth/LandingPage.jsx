// Main import
import React from 'react'
import { auth, provider } from '../../../firebase';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { authState, userInfo } from '../../provider/RecoilStore';
import axios from 'axios';

// Assets import
import PepperWallet from '../../assets/images/logo/pepper-wallet.png'
import GoogleIcon from '../../assets/images/icons/login-icon/google-icon.png'

const LandingPage = () => {
     const navigation = useNavigate()
     const [authValue, setAuthValue] = useRecoilState(authState);
     const [userValue, setUserValue] = useRecoilState(userInfo);
     const signInWithGoogle = async () => {
          try {
               const result = await signInWithPopup(auth, provider);
               const user = result.user;
               const idToken = await user.getIdToken();
               const response = await axios.post('http://localhost:3000/auth/verify-token', { token: idToken });
               setUserValue(response.data)
               setAuthValue(true)
               // navigation('/dashboard')
               navigation('/transactions')

          } catch (error) {
               console.error("Error signing in with Google: ", error);
          }
     };
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
                         <div className='auth-btn' onClick={signInWithGoogle}>
                              <img className='auth-icon' src={GoogleIcon} alt="" />
                              <span>Continue with Google</span>
                         </div>
                    </div>
               </div>
          </div>
     )
}

export default LandingPage
