import React, {useState, useEffect} from "react";
import Note from "./Note";
import axios from "axios";
import InputArea from "./InputArea";
import HighlightIcon from '@mui/icons-material/Highlight';
function App(){
    const year = new Date().getFullYear();
    const [noteList, setNoteList] = useState([]);

    // get the data from the server
    useEffect(() => {
        fetch("/api")
          .then((res) => res.json())
          .then((d) => setNoteList(d));
      }, []);

    // front-end code from here 
    function addNote(newNote){
       // Render the change on the page
        setNoteList((prevNotes)=>{
            return [...prevNotes, newNote];
        });

        // And also synchroize the change to the database, append newNote to database
        
        const newNoteSend = {
            title:newNote.title,
            content:newNote.content
        };
        console.log(newNoteSend);
        axios.post("/api", newNoteSend);
    }
    function deleteNote(id){
        setNoteList((prevList)=>{
            return prevList.filter((listElement)=>{
                return id !== listElement._id;
            });
        });
        // And also synchronize the change to the database, delete that particular item
        const deleteId = {
            _id:id
        }
        axios.post("/api/delete", deleteId);
    }
    return (
        <div>
            <header>
                <h1> <HighlightIcon /> Keeper</h1>
            </header>
            <InputArea addNote={addNote}/>
            {noteList.map((note)=>{
                return (<Note 
                    id = {note._id}
                    key = {note._id}
                    title = {note.title}
                    content = {note.content}
                    deleteNote = {deleteNote}
                />);
            })}
            <footer>
                <p>Copyright @ {year}</p>
            </footer>
        </div>
    );
}
export default App;