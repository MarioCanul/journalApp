import React, { useEffect ,useState} from 'react'
import { useDispatch } from 'react-redux';
import {
    BrowserRouter as Router,
    Switch,
    Redirect,
   
  } from "react-router-dom";
  import {firebase} from '../components/firebase/firebase-config'
import { JournalScreen } from '../components/Journal/JournalScreen';
import { AuthRouter } from './AuthRouter';
import { login } from '../actions/auth';
import { PublicRoute } from './PublicRoute ';
import { PrivateRoute } from './PrivateRoute ';

import { startLoadingNotes } from '../actions/notes';
export const AppRouter = () => {
  const [checking, setChecking] = useState(true)
const [isAutenticated, setisAutenticated] = useState(false)
  const dispatch=useDispatch()
  useEffect(() => {
    firebase.auth().onAuthStateChanged(async(user)=>{
      if (user?.uid) {
        dispatch(login(user.uid,user.displayName))
        setisAutenticated(true)
       dispatch(startLoadingNotes(user.uid))
        
      }else{
        setisAutenticated(false)
      }
      setChecking(false)
    })
    
  }, [dispatch,setChecking,setisAutenticated])

  if (checking) {
    return (<h1>....Espere</h1>)
  }
    return (
        <Router>
        <div>
          <Switch>


          <PublicRoute  
          path="/auth" 
          isAuthenticated={isAutenticated}
           redirect={'/'}
            component={AuthRouter} 
            />
            <PrivateRoute 
            exact
            isAuthenticated={isAutenticated}
             path="/" 
             redirect={'/auth/login'}
              component={JournalScreen} />

           {/* <Route path='/Auth' component={AuthRouter}/>

           <Route exact path='/' component={JournalScreen}/> */}
           <Redirect to='/Auth/login' />
          </Switch>
        </div>
      </Router>
    )
}
