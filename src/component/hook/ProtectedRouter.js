import React from 'react';
import PropTypes from 'prop-types';

import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRouter = ({ children }) => {
    const user = useSelector((state) => state.user.user);

    if (!user) {
        return <Navigate to="/" />;
    } else {
        return children;
    }
};

ProtectedRouter.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ProtectedRouter;
