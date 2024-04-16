import React from 'react';
import {Outlet , Navigate} from 'react-router-dom'

const PrivateRoute = ({ isAuthenticated }) => {
  console.log(isAuthenticated);
  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return <Outlet/>;
};

export default PrivateRoute;
