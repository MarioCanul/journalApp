import React from 'react'
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom'

export const PrivateRoute = ({
    isAuthenticated,
    component:Component,
    redirect,
    ...rest
}) => {
   
    localStorage.setItem('last',rest.location.pathname)
    return (
        <Route {...rest}
        component={(props)=>(
                (isAuthenticated)
                ?(<Component {...props}/>)
                :(<Redirect to={redirect}/>)
            )}
        />
    )
}
PrivateRoute.propType={
    isAuthenticated:PropTypes.bool.isRequired,
    Component:PropTypes.func.isRequired,
    redirect:PropTypes.string.isRequired

}