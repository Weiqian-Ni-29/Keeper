import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';
function Note(props){
    return (
        <div className="note">
            <h1>{props.title}</h1>
            <p>{props.content}</p>
            <DeleteIcon onClick={()=>{
                // console.log("props.id:"+props.id);
                 props.deleteNote(props.id);    
                // props.deleteNote(props.title);
            }}/>
        </div>
    );
}
export default Note;