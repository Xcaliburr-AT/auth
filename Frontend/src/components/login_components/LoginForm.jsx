import React from "react";
import './LoginForm.css';
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";

const LoginForm = ({ onShowSignup }) => {
    return (
        <div className='wrapper'>
            <form action="">
                <h1>Login</h1>
                <div className="input-box">
                    <input type="email" placeholder='Email Address' required />
                    <FaUser className="icon" />
                </div>

                <div className="input-box">
                    <input type="password" placeholder='Password' required />
                    <RiLockPasswordFill className="icon" />
                </div>

                <div className="remember-forgot">
                    <label><input type="checkbox" />remember me</label>
                    <a href="#">Forgot Password</a>
                </div>
                
                <button type="submit">Login</button>

                <div className="register-link">
                    <p>Don't have an account? <a href="#" onClick={onShowSignup}>Register</a></p>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;
