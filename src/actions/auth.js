import { types } from "../types/types";
import Swal from 'sweetalert2'
import {firebase, googleAuthprovider} from '../components/firebase/firebase-config'
import { uiFinishLoading, uiStartLoading } from "./ui";
export const startLoginWithEmailPass=(email,password)=>{
    return (dispatch)=>{
        dispatch(uiStartLoading())
        firebase.auth().signInWithEmailAndPassword(email,password)
        .then(({user})=>{
            dispatch(login(user.uid,user.displayName))
            dispatch(uiFinishLoading())
        })
        .catch((e)=>{
            console.log(e)
            dispatch(uiFinishLoading())
            Swal.fire('Error',e.message,'error')
        })
    }
}
export const startGoogleLogin=()=>{
    return(dispatch)=>{
        firebase.auth().signInWithPopup(googleAuthprovider)
        .then(({user})=>{
           
            dispatch(login(user.uid,user.displayName))
        })
        .catch((e)=>{
            console.log(e)
            Swal.fire('Error',e.message,'error')
        })
    }

}
export const startRegisterWithEmailPasswordName=(email,password,name)=>{
    return (dispatch)=>{
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(async({user})=>{
            await user.updateProfile({
                displayName:name
            })
            console.log(user)
            dispatch(
                login(user.uid,user.displayName)
                )
        })
        .catch((e)=>{
            console.log(e)
            Swal.fire('Error',e.message,'error')
        })
    }
}
export const login=(uid,displayName)=>({
    type:types.login,
    payload:{
        uid,
        displayName
    }
}
)
export const startLogout=()=>{
    return (dispatch)=>{
firebase.auth().signOut()
dispatch(logOut())
    }
}
export const logOut=()=>({
    type:types.logout,
    
})