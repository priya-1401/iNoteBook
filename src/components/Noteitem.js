import {React,useContext} from "react";
import noteContext from "../context/notes/NoteContext"

export default function Noteitem(props) {
  const context=useContext(noteContext);
  const {deleteNote}=context;
  const { note,updateNote } = props;
  return (
    <div className="col md-3 position-relative">
      <div className="card my-3 " style={{ color:props.mode === "dark" ? "white" : "black",backgroundColor: props.mode === "dark" ? "#333" : "white" }}>
        <div className="card-body">
            <div className="d-flex align-items-center">
            <h5 className="card-title">{note.title}</h5>
            <span className="position-absolute top-0 end-0 badge rounded-pill bg-primary m-2">
                {note.tag}
              </span>
            <i className="fa-solid fa-trash mx-2" onClick={()=>{deleteNote(note._id);
              props.showAlert("Deleted Successfully","success")
            }}></i>
          <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{updateNote(note);
          }}></i>
            </div>
          <p className="card-text">
          {note.description}
          </p>
        </div>
      </div>
    </div>
  );
}
