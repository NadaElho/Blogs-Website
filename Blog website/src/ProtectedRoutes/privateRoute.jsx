import React from 'react';
import {Outlet , Navigate} from 'react-router-dom'

const PrivateRoute = ({ isAuthenticated }) =>  (isAuthenticated) ? <Navigate to="/" /> : <Outlet/>

export default PrivateRoute;
