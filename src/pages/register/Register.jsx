import React, { useState } from 'react';
import './Register.scss';

import Form from 'react-bootstrap/Form';
import Button from '../../component/button/Button';
import Story from '../../component/story/Story';

import { auth, db } from '../../Firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';

import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const HandleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            setDoc(doc(db, 'users', email), {
                saveShow: [],
            });
            navigate('/');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <>
            <div className="register">
                <div className="register__overlay ">
                    <Form onSubmit={HandleSubmit}>
                        <h1>Sign Up</h1>
                        <Form.Group className="mb-4 " controlId="formBasicEmail">
                            <Form.Control
                                className="mb-3 "
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>
                        <Button className="sigIn__btn">Sign up</Button>
                        <Form.Group className="mb-3 remember" controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Remember me" />
                            <p>Need help?</p>
                        </Form.Group>
                        {error ? <p className="error">{error}</p> : null}
                        <div className="desc">
                            <span>
                                Already subscribed to Netflix ?
                                <span>
                                    <Link to="/login"> Sign In now</Link>
                                </span>
                            </span>
                            <p>
                                This page is protected by Google reCAPTCHA to ensure you're not a bot.
                                <span>Learn more.</span>
                            </p>
                        </div>
                    </Form>
                </div>
            </div>
            {/* Story */}
            <Story />
        </>
    );
};

export default Register;
