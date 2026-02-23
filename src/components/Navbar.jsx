import { Link, useNavigate } from "react-router-dom";
import "../styles/navbar.css";

export default function Navbar() {

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-container">

        <div className="nav-logo">
          CareerAssess
        </div>

        <div className="nav-links">
          {user ? (
            <>
              <span className="nav-user">
                {user.name} ({user.role})
              </span>
              <button onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>

      </div>
    </nav>
  );
}
