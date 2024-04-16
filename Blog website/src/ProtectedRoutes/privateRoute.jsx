import React from 'react'
import {Outlet , Navigate} from 'react-router-dom'
import {auth} from './guard'

const PrivateRoute = () => {
    return (
      auth.token ?  <Navigate to="/" /> : <Outlet/>
    )
}
export default PrivateRoute