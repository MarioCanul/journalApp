import Swal from 'sweetalert2'

import { db } from "../components/firebase/firebase-config";
import { fileUpload } from '../helpers/fielUpload';
import { loadNotes } from "../helpers/loadNotes";
import { types } from "../types/types";

export const StartNewNote=()=>{
    return async(dispatch,getState)=>{
        const {uid}=getState().auth;
   
        const newNote={
            title:'',
            body:'',
            date:new Date().getTime()
        }
        const docRef=await db.collection(`${uid}/journal/notes`).add(newNote)
       dispatch(activeNote(uid,newNote))
       dispatch(addNewNote(uid,newNote))
    }
}
export const activeNote=(id,note)=>({
type:types.notesActive,
payload:{
    id,
    ...note
}
})
export const addNewNote=(id,note)=>({
    type:types.notesAddNew,
    payload:{
        id,
        ...note
    }
})
export const startLoadingNotes=(uid)=>{
    return async(dispatch)=>{
        const notes = await loadNotes(uid)
    dispatch(setNotes(notes))
    }
}

export const setNotes=(notes)=>({
type:types.notesLoad,
payload:notes

})
export const startSaveNote=(note)=>{
return async(dispatch,getState)=>{
    const {uid}=getState().auth;
if (!note.url) {
    delete note.url;
}
    const noteFireStore={...note}
    delete noteFireStore.id;
    console.log(note)
    await db.doc(`${uid}/journal/notes/${note.id}`).update(noteFireStore)
    Swal.fire('Saved',note.title,'success');
    dispatch(refreshNote(note.id,note))
}
}
export const refreshNote=(id,note)=>({
type:types.notesUpdated,
payload:{
    id,
    note:{
       id,
       ...note 
    }
}
})
export const starUploading=(file)=>{
return async(dispatch,getState)=>{
const {active}=getState().notes;
Swal.fire({
    title:'Uploading...',
    text:'Please Wait...',
    allowOutsideClick:false,
    onBeforeOpen:()=>{
        Swal.showLoading();
    }
    ,showConfirmButton:false
 
})
const fileURL=await fileUpload(file)
active.url=fileURL;
dispatch(startSaveNote(active));

Swal.close();
}
}
export const startDeleting=(id)=>{
    return async(dispatch,getState)=>{
        const uid=getState().auth.uid;
        console.log(`${uid}/journal/notes/${id}`)
        await db.doc(`${uid}/journal/notes/${id}`).delete();
        dispatch(deleteNote(id))
    }
}
export const deleteNote=(id)=>({
type:types.notesDelete,
payload:id
})
export const deleteNotesLogout=()=>({
   type:types.notesLogoutCleaning,

})