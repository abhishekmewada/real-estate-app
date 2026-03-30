import { useContext, useState } from "react";
import "./navbar.scss";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useNotificationStore } from "../../lib/notificationStore";
import { Menu } from "lucide-react";

function Navbar() {
  const [open, setOpen] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const fetch = useNotificationStore((state) => state.fetch);
  const number = useNotificationStore((state) => state.number);

  if(currentUser) fetch();

  return (
    <nav className="   w-full  " >
      {/* <div className=" w-7xl "  >  */}
      <div className="left flex  text-center justify-between ">
        <a href="/" className="logo flex ">
          <img src="/logo.png" alt="logo" width="50px" height="auto" />
          <span className="hidden md:flex" >RealEstate</span>
        </a>
        <div className="hidden gap-12 md:flex" > 
        <a href="/" className=" " >Home</a>
        <a href="/">About</a>
        <a href="/">Contact</a>
        <a href="/">Agents</a>
        </div>
      </div>
      <div className="right hidden lg:flex gap-4   " > 
        {currentUser ? (
          <div className="user">
            <img src={currentUser.avatar || "/noavatar.jpg"} alt="" />
            <span>{currentUser.username}</span>
            <Link to="/profile" className="profile">
              {number > 0 && <div className="notification">{number}</div>}
              <span>Profile</span>
            </Link>
          </div>
        ) : (
          <>
          <div className="text-xl signin  flex   text-center justify-center" > 
            <Link to="/login"> Sign-in </Link> 
          <Link to="/register" className=" "> Sign up </Link>
          </div>
          </>
        )}
        </div>

        {/* mobile system */}
        <div className="flex  md:hidden text-right "  > 
           <Menu size={25}
          onClick={() => setOpen(!open)}
          />         
        </div>

        {open && (
          <div className="flex mobileMenu  flex-col items-center gap-4  md:hidden">
          <a href="/">Home</a>
          <a href="/">About</a>
          <a href="/">Contact</a>
          <a href="/">Agents</a>
          <a href="/login">Sign in</a>
          <a href="/register">Sign up</a>
        </div>
        )}
     </nav>
  );
}

export default Navbar;
