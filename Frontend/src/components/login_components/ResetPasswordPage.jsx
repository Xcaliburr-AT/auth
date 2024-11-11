import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { BiLogInCircle } from "react-icons/bi";
import Spinner from "../../components/login_components/Navigation/spinner";
import { resetPassword, reset } from "../../features/auth/authSlice";

const ResetPasswordPage = () => {
    const [formData, setFormData] = useState({
        email: "",
    });

    const { email } = formData;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const userData = {
            email
        };

        dispatch(resetPassword(userData));
    };

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }
        if (isSuccess) {
            toast.success("A reset password email has been sent to you.");
            navigate("/login");
        }

        dispatch(reset());

    }, [isError, isSuccess, message, navigate, dispatch]);

    return (
        <div className="container auth__container">
            <h1 className="main__title">Reset Password <BiLogInCircle /></h1>

            {isLoading && <Spinner />}

            <form className="auth__form" onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    onChange={handleChange}
                    value={email}
                    required
                />

                <button className="btn btn-primary" type="submit">Reset Password</button>
            </form>
        </div>
    );
};

export default ResetPasswordPage;
