import React from 'react';
import {Outlet , Navigate} from 'react-router-dom'

const Guard = ({ isAuthenticated }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <Outlet/>;
};

export default Guard;
