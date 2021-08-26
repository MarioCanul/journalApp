import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { activeNote, startDeleting } from '../../actions/notes';
import { useForm } from '../../hooks/useForm';
import { NotesAppBar } from './NotesAppBar'

export const NoteScreen = () => {
    const dispatch = useDispatch()
    const {active:note} = useSelector(state => state.notes);
    const [formValues,hanldeInputChange,reset]=useForm(note)
    const {body,title,id}=formValues;
    const currectNote=useRef(note.id);
  
    useEffect(() => {
       if (note.id!==currectNote.current) {
           reset(note)
           currectNote.current=note.id
       }
    }, [note,reset])

    useEffect(() => {
        dispatch(activeNote(formValues.id,{
            ...formValues
        }))
    }, [formValues,dispatch])
    const handleDelete=()=>{
dispatch(startDeleting(id))
    }
    return (
        <div className="notes__main-content"> 
            <NotesAppBar/>
            <div className="notes__content">
            <input
            type="text"
            name='title'
            placeholder="Some Awesome title"
            className="notes__title-input"
            value={title}
            onChange={hanldeInputChange}
            />
            <textarea
            name='body'
            placeholder="What happened today"
            className="notes__textarea"
            value={body}
            onChange={hanldeInputChange}
            >

            </textarea>
            <div className="notes__image">
{ note.url&&<img
src={note.url}
alt="imagen Previa"
/>}
            </div>
        
            </div>
            <button 
            onClick={handleDelete}
            className="btn btn-danger">
                Delete
            </button>
        </div>
    )
}
