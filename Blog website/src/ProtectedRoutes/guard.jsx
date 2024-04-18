import React from 'react';
import {Outlet , Navigate} from 'react-router-dom'

const Guard = ({ isAuthenticated }) => (!isAuthenticated) ? <Navigate to="/login" /> : <Outlet/>;

export default Guard;
