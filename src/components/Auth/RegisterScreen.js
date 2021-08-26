import React from 'react'
import validator from 'validator';
import { Link } from "react-router-dom";
import { useForm } from '../../hooks/useForm';
import { useDispatch, useSelector } from 'react-redux';
import { setError, unSetError } from '../../actions/ui';
import { startRegisterWithEmailPasswordName } from '../../actions/auth';
export const RegisterScreen = () => {
  const {msgError} = useSelector(state => state.ui)
 const dispatch= useDispatch()
  const [userInput,handleInputChange]=useForm({
    name:'mario',
    email:'kurugas-sama@hotmail.com',
    password:'2504',
    password2:'2504'

  })
  const {name,email,password,password2}=userInput;
 const  handleRegister=(e)=>{
e.preventDefault()

if (validarForm()) {
  dispatch(startRegisterWithEmailPasswordName(email,password,name));
}
  }
  const validarForm=()=>{
    
    if (name.trim().length===0) {
      dispatch(setError('el campo es Requerido'));
      return false
    }else if (!validator.isEmail(email)) {

      dispatch(setError('NO e sun email correcto'));
      return false
    }else if (password!==password2|| password.length<6) {

      dispatch(setError('password should be at least 6 characters and match each other'));
      return false
    }

    dispatch(unSetError());
    return true;
  }
    return (
        <>
        <h3 className='auth__title'>Create account</h3>
      <form 
       className='animate__animated animate__fadeIn animate__faster'
      onSubmit={handleRegister}>
      {  msgError&&(
          <div className='auth__alert-error'>
      {msgError}
          </div>)}
        <input type="text" className='auth__input' placeholder="Name" name="name" autoComplete='off'
        value={name}
        onChange={handleInputChange}
        />
          <input type="text" className='auth__input' placeholder="email" name="email" autoComplete='off'
          value={email}
          onChange={handleInputChange}
          />
          <input type="passsword" className='auth__input' placeholder="passsword" name="password" autoComplete="off"
          value={password}
          onChange={handleInputChange}
          />
          <input type="passsword" className='auth__input' placeholder="Confirm password" name="password2" autoComplete="off"
          value={password2}
          onChange={handleInputChange}
          />
          <button 
          className="btn btn-primary btn-block mb-5"
          type="submit"
          >Register</button>
         
         
          <Link to='/auth/login'
          className="link"
          >
              Already registered?
          </Link>
        </form>
      </>
    )
}
