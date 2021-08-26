import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { startSaveNote, starUploading } from "../../actions/notes";

export const NotesAppBar = () => {
  const {active} = useSelector(state => state.notes)
  const dispatch = useDispatch()
  const handleSave =()=>{
    
    dispatch(startSaveNote(active))
  }
  const handlePicture=()=>{
document.querySelector('#picture').click()
  }
  const handleFileChange=(e)=>{
    const file=e.target.files
    if (file) {
      dispatch(starUploading(file))
    }
  }
  return (
    <div className="notes__appbar">
      <span>28 de Agosto 2020</span>
      <input
      id="picture" 
      type="file"
      style={{display:'none'}}
      onChange={handleFileChange}
      />

      <div>
        <button className="btn"
        onClick={handlePicture}>Picture</button>
        <button className="btn"
        onClick={handleSave}
        >Save</button>
      </div>
    </div>
  );
};
