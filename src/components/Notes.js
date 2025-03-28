import { React, useContext, useEffect, useRef,useState } from "react";
import noteContext from "../context/notes/NoteContext";
import Noteitem from "./Noteitem";
import AddNote from "./AddNote";
import {useNavigate} from 'react-router-dom'

export default function Notes(props) {
  const context = useContext(noteContext);
  let navigate=useNavigate();
  const {showAlert,mode}=props
  const { notes, getNotes,editNote } = context;
  useEffect(() => {
    if(localStorage.getItem('token')){
      getNotes();
    }
    else{
      navigate("/login")
    }
  }, [getNotes, navigate]);

  const refOpen = useRef(null);
  const refClose = useRef(null);

  const [note, setNote] = useState({
    id:"",
    etitle: "",
    edescription: "",
    etag: "default",
  });

  const updateNote = (currentNote) => {
    refOpen.current.click();
    setNote({id: currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag})
  };

  
  const handleclick = (e) => {
    if (refClose.current) {
      refClose.current.click();
      props.showAlert("Updated Successfully","success")
    }
    console.log("Updating a note ..."+note)
    e.preventDefault();
    editNote(note.id,note.etitle,note.edescription,note.etag)
  };

  const onchange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <AddNote showAlert={props.showAlert} mode={mode}/>
      <button
        type="button"
        ref={refOpen}
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document" >
          <div className="modal-content" style={{backgroundColor: mode === "dark" ? "#333" : "white" }}>
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel" style={{ color:mode === "dark" ? "white" : "black" }}>
                Edit Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
              </button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label" style={{ color:mode === "dark" ? "white" : "black" }}>
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    style={{ color:mode === "dark" ? "white" : "black",backgroundColor: mode === "dark" ? "#333" : "white" }}
                    id="etitle"
                    name="etitle"
                    value={note.etitle}
                    onChange={onchange}
                    
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label" style={{ color:mode === "dark" ? "white" : "black" }}>
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    value={note.edescription}
                    onChange={onchange}
                    minLength={5}
                    required
                    style={{ color:mode === "dark" ? "white" : "black",backgroundColor: mode === "dark" ? "#333" : "white" }}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label" style={{ color:mode === "dark" ? "white" : "black" }}>
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    value={note.etag}
                    onChange={onchange}
                    minLength={5}
                    required
                    style={{ color:mode === "dark" ? "white" : "black",backgroundColor: mode === "dark" ? "#333" : "white" }}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
              <button disabled={note.etitle.length<5||note.edescription.length<5} type="button" onClick={handleclick} className="btn btn-primary">
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-5 px-3">
        <h1 className="mb-4" style={{ color:mode === "dark" ? "white" : "black" }}>Your Notes</h1> 
          <div className="container position-relative" style={{ color:mode === "dark" ? "white" : "black" }}>
        {notes.length===0 && "No Notes to display"}
        </div>
        {notes.map((note) => {
          return (
            <Noteitem key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note} mode={mode}/>
          );
        })}
      </div>
    </>
  );
}
