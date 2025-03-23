import {React,useState} from "react";
import {useNavigate} from 'react-router-dom'

const Signup = (props) => {
  const [credentials,setcredentials]=useState({name:"",email:"",password:"",cpassword:""})
    let navigate=useNavigate();
    const handleSubmit=async (e)=>{
        e.preventDefault();
        const {name,email,password} = credentials;
        const response=await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/createuser`,{
            method:'POST',
            headers:{
                'content-Type':'application/json'
            },
            body: JSON.stringify({name:credentials.name,email: credentials.email,password:credentials.password})
        });
        const json=await response.json();
        console.log(json);
        if(json.success){
          localStorage.setItem('token',json.authtoken)
          navigate("/")
          props.showAlert("Account Created Successfully","success")
        }
        else{
          props.showAlert("Invalid Credentials","danger")
        }
    }

    const onchange=(e)=>{
        setcredentials({...credentials,[e.target.name]: e.target.value})
    }
  return (
    <div className="container mt-3">
      <form onSubmit={handleSubmit}>
      <div className="mb-3">
          <label htmlFor="name" className="form-label" style={{ color:props.mode === "dark" ? "white" : "black" }}>
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            onChange={onchange}
            aria-describedby="emailHelp"
            style={{ color:props.mode === "dark" ? "white" : "black",backgroundColor: props.mode === "dark" ? "#333" : "white" }}
          />
        </div>
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
            aria-describedby="emailHelp"
            style={{ color:props.mode === "dark" ? "white" : "black",backgroundColor: props.mode === "dark" ? "#333" : "white" }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label" style={{ color:props.mode === "dark" ? "white" : "black" }}>
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            onChange={onchange}
            minLength={5}
            required
            style={{ color:props.mode === "dark" ? "white" : "black",backgroundColor: props.mode === "dark" ? "#333" : "white" }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label" style={{ color:props.mode === "dark" ? "white" : "black" }}>
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="cpassword"
            name="cpassword"
            onChange={onchange}
            minLength={5}
            required
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

export default Signup;
