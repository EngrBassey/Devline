import React from 'react';
import './sign.css';
import { FaGoogle, FaFacebook } from "react-icons/fa6";
import FullSphere from '../../asserts/sphere (1).png';
import HalfSphere from '../../asserts/sphere.png';

const Register = () => {
  return (
    <div className='signin-box'>
      <div className='sphere-box'>
        <img src={HalfSphere} className='sphere-1' alt="" />
        <img src={FullSphere} className='sphere-2' alt="fullsphere" />
      </div>
      <div className='signin-section'>
        <h2>Sign Up.</h2>
        <div className='socials-box'>
          <button className="btn-social">
            <div className='btn-child'>
              <FaGoogle size={15} />
              <p>Continue with Google</p>
            </div>
          </button>
          <button className="btn-social box-2">
            <div className="btn-child">
              <FaFacebook size={15} />
              <p>Continue with Google</p>
            </div>
          </button>
        </div>
        <div className='socials-box'>
          <p>or</p>
          <input type="text" className='box-input' placeholder='Email' required="required" />
          <input type="text" className='box-input box-3' placeholder='Full Name' required="required" />
          <input type="password" className='box-input box-3' placeholder='Enter Password' required="required" />
          <input type="password" className='box-input box-3' placeholder='Confirm Password' required="required" />
          <button className="btn-signin btn-social box-4" > Sign up</button >
          <div>
            <div className='account-box'>
              <p className='acct-txt'>have account already?</p>
              <a href="">Sign in</a>
            </div>
          </div>
        </div>

      </div>
    </div >
  )
}

export default Register
