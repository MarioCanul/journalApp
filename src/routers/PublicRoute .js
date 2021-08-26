import React from 'react'
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom'

export const PublicRoute = ({
    isAuthenticated,
    component:Component,
    redirect,
    ...rest
}) => {
    return (
        <Route {...rest}
        component={(props)=>(
                (!isAuthenticated)
                ?(<Component {...props}/>)
                :(<Redirect to={redirect}/>)
            )}
        />
    )
}
PublicRoute.propType={
    isAuthenticated:PropTypes.bool.isRequired,
    Component:PropTypes.func.isRequired,
    redirect:PropTypes.string.isRequired

}