import React, {useState} from "react";
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';
function InputArea(props){
    const [note, setNote] = useState({title:"", content:""});
    const [zoomsIn, setZoom] = useState(false);
    function update(event){
        const name = event.target.name;
        const value = event.target.value;
        setNote((prevValue)=>{
            return {...prevValue, [name] : value};
        });
    }
    function changeZoom(){
        setZoom(true);
    }
    return (
        <div>
            <form className="create-note">
                {zoomsIn && <h1><input placeholder="Title" name="title" onChange={update} value={note.title}></input></h1>}
                <p><textarea placeholder="Take a note..." name="content" onChange={update} value={note.content} rows = {zoomsIn ? "3" : "1"} onClick={changeZoom}></textarea></p>
                <Zoom in={zoomsIn}>
                    <Fab onClick={(event)=>{
                        props.addNote(note);
                        setNote({title:"", content:""}); 
                        setZoom(false);   
                        event.preventDefault();
                    }}>
                    <AddIcon/>
                    </Fab>
                </Zoom> 
            </form>
        </div>
    );
}
export default InputArea;