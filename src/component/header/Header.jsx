import React, { useEffect, useRef, useState } from 'react';
import './Header.scss';
import { NavLink, Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container';

import Tippy from '@tippyjs/react/headless';

import logo from '../../assets/images/Logo.png';
import notUser from '../../assets/images/avatarError.jpg';
import hasUser from '../../assets/images/hasUser.png';
import MenuIcon from '@mui/icons-material/Menu';

import { useSelector, useDispatch } from 'react-redux';
import { auth } from '../../Firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { userActions } from '../../store/userSlice';

const navBar = [
    {
        display: 'Home',
        path: '/',
    },
    {
        display: 'Movies',
        path: '/movie',
    },
    {
        display: 'TV Series',
        path: '/tv',
    },
];

const Header = () => {
    const user = useSelector((state) => state.user.user);
    const [scroll, setScroll] = useState(false);
    const showMenuRef = useRef();
    const dispatch = useDispatch();

    useEffect(() => {
        const unSubscribed = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                dispatch(
                    userActions.login({
                        email: currentUser.email,
                    }),
                );
            } else {
                dispatch(userActions.logout());
            }
        });

        return () => {
            unSubscribed();
        };
    }, [dispatch]);

    const HandleLogOut = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.log(error);
        }
    };

    window.onscroll = () => {
        setScroll(window.scrollY === 0 ? false : true);
        return () => (window.onscroll = null);
    };

    const ToggleMenu = () => {
        showMenuRef.current.classList.toggle('show__menu');
    };

    return (
        <div className={`header ${scroll ? 'header__shrink' : ''} `}>
            <Container>
                <div className="header__wrap d-flex justify-content-between align-items-center">
                    <div className="logo">
                        <Link to="/">
                            <img src={logo} alt="" />
                        </Link>
                    </div>

                    {/* Menu */}
                    <div className="navigation" ref={showMenuRef} onClick={ToggleMenu}>
                        <div className="menu d-flex align-items-center gap-4">
                            {navBar.map((item, index) => (
                                <NavLink
                                    to={item.path}
                                    key={index}
                                    className={(navClass) => (navClass.isActive ? 'active' : '')}
                                >
                                    {item.display}
                                </NavLink>
                            ))}
                        </div>
                    </div>

                    <div className="header__user d-flex align-items-center gap-3">
                        <Tippy
                            inertia
                            interactive
                            delay={[0, 700]}
                            placement="bottom"
                            render={(attrs) => (
                                <div className="user__list" tabIndex="-1" {...attrs}>
                                    <div className="user__items d-flex flex-column gap-2 ">
                                        {user?.email ? (
                                            <>
                                                <span>
                                                    <Link to="/account">account</Link>
                                                </span>
                                                <span onClick={HandleLogOut}>Logout</span>
                                            </>
                                        ) : (
                                            <>
                                                <span>
                                                    <Link to="/login">Login</Link>
                                                </span>
                                                <span>
                                                    <Link to="/register">Register</Link>
                                                </span>
                                            </>
                                        )}
                                    </div>
                                </div>
                            )}
                        >
                            {user?.email ? (
                                <img src={hasUser} alt="user" className="header__user-img" />
                            ) : (
                                <img src={notUser} alt="user" className="header__user-img" />
                            )}
                        </Tippy>

                        {/* Mobile Menu */}
                        <span className="mobile__menu" onClick={ToggleMenu}>
                            <MenuIcon className="icon" />
                        </span>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Header;
