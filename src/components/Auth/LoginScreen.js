import React from "react";
import validator from 'validator';
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { startGoogleLogin, startLoginWithEmailPass } from "../../actions/auth";
import { setError, unSetError } from "../../actions/ui";

export const LoginScreen = () => {
  const {msgError,loading} = useSelector(state => state.ui)
  const dispatch = useDispatch();
 const[ values, handleInputChange]=useForm({
   email:'mario_can13@hotmail.com',
   password:'250497'
 })
 const {email,password}=values;
 const formvalidator=()=>{
   if (!validator.isEmail(email)) {
    dispatch(setError('NO e sun email correcto'));
     return false
   }else if (password.length<6) {
    dispatch(setError('password should be at least 6 characters'));
    return false
   }
   dispatch(unSetError());
   return true
 }
 const handleForm=(e)=>{
   e.preventDefault();
   if (formvalidator()) {
     dispatch(startLoginWithEmailPass(email,password));
   }

 }

 const handleGoogleSign=()=>{
  dispatch(startGoogleLogin(email,password));
}
  return (
    <>
      <h3 className='auth__title'>Login</h3>
      <form 
      className='animate__animated animate__fadeIn animate__faster'
      onSubmit={handleForm}>
      {  msgError&&(
          <div className='auth__alert-error'>
      {msgError}
          </div>)}
        <input type="text" className='auth__input' placeholder="email" name="email" autoComplete='off' 
        value={email} 
        onChange={handleInputChange}
        />
        <input type="passsword" className='auth__input' placeholder="password" name="password"
        value={password}
         onChange={handleInputChange}
          autoComplete="off" 
          />
        <button 
        className="btn btn-primary btn-block"
        type="submit"
        disabled={loading}
        >Login</button>
        <hr />
        <div className="auth__social-networks">
          <p>Login with Social Network</p>
          <div className="google-btn" onClick={handleGoogleSign}>
            <div className="google-icon-wrapper">
              <img
                className="google-icon"
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                alt="google button"
              />
            </div>
            <p className="btn-text">
              <b>Sign in with google</b>
            </p>
          </div>
        </div>
        <Link to='/auth/register'
        className="link"
        >
            Create new account
        </Link>
      </form>
    </>
  );
};
