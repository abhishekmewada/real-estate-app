import "./register.scss";
import { Link, useNavigate } from "react-router-dom";
import {Eye, EyeOff } from 'lucide-react'
// import axios from "axios";
import { useState } from "react";
import apiRequest from "../../lib/apiRequest";

function Register() {
  const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword ] = useState(false);

  
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("")
    setIsLoading(true);
    const data ={
      username,
      email,
      password  
    }
    console.log("register data", data);
    try {
      const res = await apiRequest.post("/auth/register", {
        username,
        email,
        password,
      });
     console.log("register data", res.data);
 
      navigate("/login");
    } catch (err) {
      setError(err.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  


  return (
    <div className="registerPage">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Create an Account</h1>
          <input name="username" type="text" onChange={(e) => setUserName(e.target.value)} placeholder="Username" />
          <input name="email" type="text" onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
          <div className="flex relative " > 
          <input name="password" type= {showPassword ? "text" : "password"} 
           onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            <span className="absolute top-[40%]  right-3"
             onClick={() => setShowPassword(!showPassword)} > {showPassword ? <EyeOff size={20} /> : <Eye size={20} /> } </span>
            </div>
          <button disabled={isLoading}>Register</button>
          {error && <span>{error}</span>}
          <Link to="/login">Do you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Register;
