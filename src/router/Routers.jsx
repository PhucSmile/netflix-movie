import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Home from '../pages/home/Home';
import Catelog from '../pages/catalog/Catelog';
import Detail from '../pages/detail/Detail';
import Register from '../pages/register/Register';
import Login from '../pages/login/Login';
import Account from '../pages/Account/Account';
import ProtectedRouter from '../component/hook/ProtectedRouter';

const Routers = () => {
    return (
        <Routes>
            <Route path="/netflix-movie" element={<Navigate to="/" />} />
            <Route path="/" element={<Home />} />
            <Route path="/:category/search/:keyword" element={<Catelog />} />
            <Route path="/:category/:id" element={<Detail />} />
            <Route path="/:category" element={<Catelog />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route
                path="/account"
                element={
                    <ProtectedRouter>
                        <Account />
                    </ProtectedRouter>
                }
            />
        </Routes>
    );
};

export default Routers;
