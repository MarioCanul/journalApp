import React from 'react'
import {
    Switch,
    Route,
    Redirect
  } from "react-router-dom";
import { LoginScreen } from '../components/Auth/LoginScreen';
import { RegisterScreen } from '../components/Auth/RegisterScreen';
export const AuthRouter = () => {
    return (
        <div className='auth__main'>
<div className='auth__box-container'>

        <Switch>
                      <Route path='/Auth/login' component={LoginScreen}/>
                      <Route path='/Auth/register' component={RegisterScreen}/>
                      <Redirect to='/Auth/login' />
        </Switch>
</div>
        </div>
    )
}
