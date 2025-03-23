import {React,useState} from "react";
import {useNavigate} from 'react-router-dom'
const Login = (props) => {
    const [credentials,setcredentials]=useState({email:"",password:""})
    let navigate=useNavigate();
    const handleSubmit=async (e)=>{
        e.preventDefault();
        const response=await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/login`,{
            method:'POST',
            headers:{
                'content-Type':'application/json'
            },
            body: JSON.stringify({email: credentials.email,password:credentials.password})
        });
        const json=await response.json();
        if(json.success){
            localStorage.setItem('token',json.authtoken)
            navigate("/")
            props.showAlert("Logged in Successfully","success")
        }
        else{
          props.showAlert("Invalid Credentials","danger")
        }
    }

    const onchange=(e)=>{
        setcredentials({...credentials,[e.target.name]: e.target.value})
    }

  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label" style={{ color:props.mode === "dark" ? "white" : "black" }}>
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            onChange={onchange}
            value={credentials.email}
            aria-describedby="emailHelp"
            style={{ color:props.mode === "dark" ? "white" : "black",backgroundColor: props.mode === "dark" ? "#333" : "white" }}
          />
          <div id="emailHelp" className="form-text" style={{ color:props.mode === "dark" ? "white" : "black"}}>
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label" style={{ color:props.mode === "dark" ? "white" : "black"}}>
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            onChange={onchange}
            value={credentials.password}
            name="password"
            style={{ color:props.mode === "dark" ? "white" : "black",backgroundColor: props.mode === "dark" ? "#333" : "white" }}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
