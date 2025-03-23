import {React,useEffect} from "react";
import {
    Link,
    useLocation
  } from "react-router-dom";
import About from "./About";
import {useNavigate} from 'react-router-dom'
import darkModeIcon from "./dark-mode.svg";
import lightModeIcon from "./light_mode.png";

const Navbar=(props) => {
    let navigate=useNavigate();
    const handleLogout = ()=>{
        localStorage.removeItem('token');
        navigate('/login')
    }
    let location = useLocation();
    useEffect(() => {
    }, [location]);
return (
        <nav className="navbar navbar-expand-lg bg-body-" style={{
            backgroundColor: props.mode === "dark" ? "#222" : "#f8f9fa"
          }}>
            <div className="container-fluid" >
                <Link className="navbar-brand" to="/" style={{ color:props.mode === "dark" ? "white" : "black"}}>
                    iNoteBook
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                    style={{ border: "1px solid black" }} 
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item" >
                            <Link className={`nav-link ${location.pathname==="/"?"active":""}`} aria-current="page" to="/" style={{ color:props.mode === "dark" ? "white" : "black"}}>
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname==="/about"?"active":""}`} to="/about" style={{ color:props.mode === "dark" ? "white" : "black"}}>
                                About
                            </Link>
                        </li>
                    </ul>
                    {!localStorage.getItem('token')?<form className="d-flex" role="search">
                    <Link className="btn btn-primary mx-2"  to="/login"role="button">Login</Link>
                    <Link className="btn btn-primary" to="/signup" role="button">SignUp</Link>
                    </form>:(<button onClick={handleLogout} className="btn btn-primary">Logout</button>)}
                    <button onClick={props.toggleMode} className="btn mx-2">
                    <img
                        src={props.mode==='light' ? darkModeIcon: lightModeIcon}
                        alt="Toggle Theme"
                        width="30"
                        height="30"
                    />
                </button>
                </div>
            </div>
        </nav>
);
}
export default Navbar
