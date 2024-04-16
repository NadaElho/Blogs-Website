import {Outlet , Navigate} from 'react-router-dom'

export let auth = {'token': window.localStorage.getItem("token") || ""}

const Guard=()=> {
  return (
    // auth.token ? <Outlet/> : navigate("/login") not work why??
    auth.token ? <Outlet/> : <Navigate to="/login"/>
  )
}

export default Guard;