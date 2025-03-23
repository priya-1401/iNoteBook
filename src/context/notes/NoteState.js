import { useState } from "react"
import NoteContext from "./NoteContext"

const NoteState=(props)=>{
    const host="http://localhost:5000"
    const notesInitial=[]

    const [notes,setNotes]=useState(notesInitial)

    //Fetch all notes
    const getNotes=async ()=>{
        const response=await fetch(`${host}/api/notes/fetchallnotes`,{
            method:'GET',
            headers:{
                'content-Type':'application/json',
                'auth-token':localStorage.getItem('token')
            },
        });
        const json=await response.json();
        setNotes(json);
    }
    //Add a note
    const addNote=async (title,description,tag)=>{
        const response=await fetch(`${host}/api/notes/addNote`,{
            method:'POST',
            headers:{
                'content-Type':'application/json',
                'auth-token':localStorage.getItem('token')
            },
            body: JSON.stringify({title,description,tag})
        });
        const note=await response.json();
        setNotes(notes.concat(note))
    }
    //Delete a note
    const deleteNote=async (id)=>{
        const response=await fetch(`${host}/api/notes/deletenote/${id}`,{
            method:'DELETE',
            headers:{
                'content-Type':'application/json',
                'auth-token':localStorage.getItem('token')
            },
        });
        const json=response.json();
        const newNotes=notes.filter((note)=>{return note._id!==id})
        setNotes(newNotes)
    }
    //Edit a note
    const editNote=async (id,title,description,tag)=>{
        //API Call
        const response=await fetch(`${host}/api/notes/updatenote/${id}`,{
            method:'PUT',
            headers:{
                'content-Type':'application/json',
                'auth-token':localStorage.getItem('token')
            },
            body: JSON.stringify({title,description,tag})
        });
        let newNotes=JSON.parse(JSON.stringify(notes))
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if(element._id === id){
                newNotes[index].title=title;
                newNotes[index].description=description;
                newNotes[index].tag=tag;
                break;
            }
        }
        setNotes(newNotes);
    }
    return (
        <NoteContext.Provider value={{notes,addNote,deleteNote,editNote,getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
};
export default NoteState