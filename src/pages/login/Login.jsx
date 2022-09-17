import React from 'react';
import './Login.scss';

import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from '../../component/button/Button';

import { auth } from '../../Firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const HandleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="logIn">
            <div className="logIn__overlay ">
                <Form onSubmit={HandleSubmit}>
                    <h1>Sign In</h1>

                    <Form.Group className="mb-4 " controlId="formBasicEmail">
                        <Form.Control
                            className="mb-3 "
                            type="email"
                            placeholder="Enter email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Button className="sigIn__btn">Sign In</Button>
                    <Form.Group className="mb-3 remember" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Remember me" />
                        <p>Need help?</p>
                    </Form.Group>
                    {error ? <p className="error">{error}</p> : null}
                    <div className="desc">
                        <span>
                            New to Netflix?{' '}
                            <span>
                                <Link to="/register">Sign up now</Link>
                            </span>
                            .
                        </span>
                        <p>
                            This page is protected by Google reCAPTCHA to ensure you're not a bot.{' '}
                            <span>Learn more.</span>
                        </p>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default Login;
