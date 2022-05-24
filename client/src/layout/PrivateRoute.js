import React, { useEffect, useState } from 'react'
import UserService from "../services/UserService"
import { Route, Redirect } from 'react-router-dom'

const DefaultLayout = React.lazy(() => import('./DefaultLayout'))

const PrivateRoute = ({ ...rest }) => {

  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    UserService.isUserAuth().then(response=>{
      if(response.data.auth){
        setIsAuthenticated(true)
        console.log(isAuthenticated)
      }
    }).catch(error=>{
    })
  }, [])


  return (<Route {...rest}
    render={(props) => {
      console.log(isAuthenticated)
      return isAuthenticated ? (<DefaultLayout {...props} />) : (<Redirect to="/login" />)
    }} />)
}

export default PrivateRoute
