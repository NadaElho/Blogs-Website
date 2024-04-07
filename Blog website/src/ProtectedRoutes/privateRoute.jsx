import {Outlet , Navigate} from 'react-router-dom'

let auth={'token': window.localStorage.getItem("token") || ""}

const PrivateRoute=()=> {
  return (
    // auth.token ? <Outlet/> : navigate("/login") not work why??
    auth.token ? <Outlet/> : <Navigate to="/login"/>
  )
}

export default PrivateRoute;