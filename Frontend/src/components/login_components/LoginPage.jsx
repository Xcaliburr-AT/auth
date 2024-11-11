import React, { useState, useEffect } from "react";
import './LoginForm.css';
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { useDispatch, useSelector } from 'react-redux';
import { login, reset } from '../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import Spinner from '../../components/login_components/Navigation/spinner';

const LoginForm = ({ onShowSignup }) => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const { email, password } = formData;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, isError, isLoading, isSuccess, message } = useSelector((state) => state.auth);

    useEffect(() => {
        if (isSuccess && user.access) {
            const decodedToken = jwtDecode(user.access); // Proper use of jwt_decode
            const accountType = decodedToken.account_type;

            switch (accountType) {
                case 'admin':
                    navigate('/admin');
                    break;
                case 'agent':
                    navigate('/agent');
                    break;
                case 'cashier':
                    navigate('/cashier');
                    break;
                case 'information':
                    navigate('/information');
                    break;
                case 'client':
                    navigate('/client');
                    break;
                default:
                    navigate('/login');
            }
        }

        dispatch(reset());
    }, [isSuccess, navigate, user, dispatch]);

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        dispatch(login({ email, password }));
    };

    const handleForgotPassword = () => {
        navigate('/forgot-password'); // Navigate to forgot password page
    };

    return (
        <div className='wrapper'>
            <form onSubmit={onSubmit}>
                <h1>Login</h1>
                <div className="input-box">
                    <input
                        type="email"
                        placeholder='Email Address'
                        name='email'
                        value={email}
                        onChange={onChange}
                        required
                    />
                    <FaUser className="icon" />
                </div>

                <div className="input-box">
                    <input
                        type="password"
                        placeholder='Password'
                        name='password'
                        value={password}
                        onChange={onChange}
                        required
                    />
                    <RiLockPasswordFill className="icon" />
                </div>

                <div className="remember-forgot">
                    <label><input type="checkbox" />remember me</label>
                    <a href="#" onClick={handleForgotPassword}>Forgot Password</a>
                </div>
                
                {isError && <p className="error">{message}</p>}
                {isLoading ? <Spinner /> : <button type="submit">Login</button>}

                <div className="register-link">
                    <p>Don't have an account? <a href="#" onClick={onShowSignup}>Register</a></p>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;
