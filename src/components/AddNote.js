import {React,useContext,useState} from "react";
import noteContext from "../context/notes/NoteContext"

const AddNote = (props) => {
    const context=useContext(noteContext);
    const {addNote}=context;
    const handleclick=(e)=>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
        setNote({title:"",description:"",tag:""})
        props.showAlert("Added Successfully","success")
    }
    const [note,setNote]=useState({title:"",description:"",tag:""})
    const onchange=(e)=>{
        setNote({...note,[e.target.name]: e.target.value})
    }
  return (
      <div className="container my-3">
        <h1 style={{ color:props.mode === "dark" ? "white" : "black"}}>Add a Note</h1>
        <form className="my-3">
          <div className="mb-3">
            <label htmlFor="title" className="form-label" style={{ color:props.mode === "dark" ? "white" : "black"}}>
                Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              value={note.title}
              name="title"
              onChange={onchange}
              minLength={5}
              required
              style={{ color:props.mode === "dark" ? "white" : "black",backgroundColor: props.mode === "dark" ? "#333" : "white" }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="desc" className="form-label" style={{ color:props.mode === "dark" ? "white" : "black"}}>
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              value={note.description}
              onChange={onchange}
              minLength={5}
              required
              style={{ color:props.mode === "dark" ? "white" : "black",backgroundColor: props.mode === "dark" ? "#333" : "white" }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label" style={{ color:props.mode === "dark" ? "white" : "black"}}>
              Tag
            </label>
            <input
              type="text"
              className="form-control"
              id="tag"
              name="tag"
              value={note.tag}
              onChange={onchange}
              minLength={5}
              required
              style={{ color:props.mode === "dark" ? "white" : "black",backgroundColor: props.mode === "dark" ? "#333" : "white" }}
            />
          </div>
          
          <button disabled={note.title.length<5||note.description.length<5} type="submit" className="btn btn-primary" onClick={handleclick}>
            Add Note
          </button>
        </form>
      </div>
  );
};

export default AddNote;
