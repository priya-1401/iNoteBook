import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { useState } from "react";
function App() {
  const [alert,setAlert]=useState(null);
  const [mode, setMode] = useState('light'); 
  const showAlert=(message,type)=>{
    setAlert({
      msg:message,
      type:type
    })
    setTimeout(()=>{
      setAlert(null);
    },1500)
  }
  const toggleMode = ()=>{
    if(mode === 'light'){
      setMode('dark');
      document.body.style.backgroundColor = '#1F1B24';
      showAlert("Dark mode has been enabled", "success");
    }
    else{
      setMode('light');
      document.body.style.backgroundColor = 'white';
      showAlert("Light mode has been enabled", "success");
    }
  }
  return (
    <>
      <NoteState>
        <Router>
          <Navbar mode={mode} toggleMode={toggleMode}/>
          <Alert alert={alert} />
          <div className="conatiner">
            <Routes>
              <Route exact path="/" element={<Home showAlert={showAlert} mode={mode}/>}></Route>
              <Route exact path="/about" element={<About mode={mode}/>}></Route>
              <Route exact path="/login" element={<Login showAlert={showAlert} mode={mode} />}></Route>
              <Route exact path="/signup" element={<Signup showAlert={showAlert} mode={mode}/>}></Route>
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
