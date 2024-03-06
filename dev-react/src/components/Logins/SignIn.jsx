import React from 'react';
import './sign.css';
import { FaGoogle, FaFacebook } from "react-icons/fa6";
import FullSphere from '../../asserts/sphere (1).png';
import HalfSphere from '../../asserts/sphere.png';


const SignIn = () => {
    return (
        <div className='signin-box'>
            <div className='sphere-box'>
                <img src={HalfSphere} className='sphere-1' alt="" />
                <img src={FullSphere} className='sphere-2' alt="fullsphere" />
            </div>
            <div className='signin-section'>
                <h2>Sign In.</h2>
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
                    <input type="text" className='box-input' placeholder='Email' />
                    <input type="password" className='box-input box-3' placeholder='Password' />
                    <button className="btn-signin btn-social box-4" > Sign In</button >
                    <div>
                        <div className='account-box'>
                            <p className='acct-txt'>don't have an account?</p>
                            <a href="">Create an account</a>
                        </div>
                        <div className='f-pass'>
                            <a href="">Forgot password</a>
                        </div>
                    </div>
                </div>

            </div>
        </div >
    )
}

export default SignIn
