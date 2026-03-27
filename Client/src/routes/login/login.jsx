import { useContext, useState } from "react";
import "./login.scss";
import { Link, useNavigate } from "react-router-dom";
import apiRequest from "../../lib/apiRequest";
import { AuthContext } from "../../context/AuthContext";
import { EyeOff, Eye } from "lucide-react";

function Login() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setNewFormData] = useState({
    username:"",
    password:"",
  });
  const [showPassword, setShowPassword] = useState(false);

 
 
   const {updateUser} = useContext(AuthContext)

  const navigate = useNavigate();

  const handleChange = (e) =>{
      setNewFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await apiRequest.post("/auth/login", formData );
  console.log("login data", res.data);
      updateUser(res.data.user);
      console.log("updateUser data=======================", updateUser)
      // localStorage.setItem('user', JSON.stringify(res.data))
      navigate("/");
    } catch (err) {
setError(err.response?.data?.message || "Login failed");
    } finally {
      setIsLoading(false);
      setNewFormData({
  username: "",
  password: "",
});

    }
  };
  return (
    <div className="login">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Welcome back</h1>
          <input
            name="username"
            required
            minLength={3}
            maxLength={20}
            type="text"
            onChange={handleChange}
            placeholder="Username"
          />
          <div className="flex relative" >
          <input
            name="password"
            type ={showPassword ? "text" : "password"}
            required
            onChange={handleChange}
            placeholder="Password"
 
          />
          <span className="absolute top-[40%]  right-3"
           onClick={()=> setShowPassword(!showPassword)} >
            {showPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
          </span>
          </div>
          <button disabled={isLoading}>Login</button>
          {error && <span>{error}</span>}
          <Link to="/register">{"Don't"} you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Login;
