import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../cssFiles/login.css";
import { authServices } from '../apiServices/auth';
import { useDispatch } from 'react-redux';
import { login } from '../store/authSlice';
import RetroBG from '../components/backgrounds/RetroBG';
import { addNotification } from '../store/notificationSlice';
import MainContainer from "../components/MainContainer";

export default function Login() {
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [identifierError, setIdentifierError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handelSubmit = async (e) => {
        if (password === "") {
            setPasswordError("Password is required");
            return;
        } else if (identifier === "") {
            setIdentifierError("Username or Email is required");
            return;
        };
        setLoading(true);
        e.preventDefault();
        const response = await authServices.login({ identifier: identifier.trim(), password: password.trim() });
        if (response.data && response.status < 400) {
            dispatch(login(response.data));
            dispatch(addNotification({ text: "You have been logged in", type: "success" }));
            setLoading(false);
            navigate('/');
        } else {
            dispatch(addNotification({ text: response.message, type: "error" }));
            setLoading(false);
            return;
        }
    };

    const handelIndentifierChange = (e) => {
        const value = e.target.value;
        setIdentifier(value);
        if (value.trim() === "") {
            setIdentifierError("Identifier is required");
        } else {
            setIdentifierError("");
        }
    }

    const handelPasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);
        if (value.trim() === "") {
            setPasswordError("Password is required");
        } else {
            setPasswordError("");
        }
    }

    return (
        <>
            {loading && <RetroBG text={"Login in Your Account..."} />}
            {!loading &&
                <MainContainer>
                    <div className='main-container'>
                    <div className="ring">
                        <i className="i101" />
                        <i className="i202" />
                        <i className="i303" />
                        <div className="login">
                            <h2>Login</h2>
                            <div className="inputBx">
                                <input type="text" placeholder="Username or Email" required={true} value={identifier}
                                    onChange={handelIndentifierChange} />
                                <p className='text-red-500 text-[12px] font-semibold mt-1 ml-4'>
                                    {identifierError}
                                </p>
                            </div>
                            <div className="inputBx">
                                <input type="password" required={true} placeholder="Password" value={password}
                                    onChange={handelPasswordChange} />
                                <p className='text-red-500 text-[12px] font-semibold mt-1 ml-4'>
                                    {passwordError}
                                </p>
                            </div>
                            <div className="inputBx">
                                <input type="button" value="Sign in"
                                    onClick={handelSubmit} />
                            </div>
                            <div className="links">
                                <Link to={"/forgot-password"}>Forget Password</Link>
                                <Link to={"/signup"}>Signup</Link>
                            </div>
                        </div>
                    </div>
                </div>
                </MainContainer>
            }
        </>
    )
}
