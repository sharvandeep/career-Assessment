import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";
import "../styles/auth.css";

export default function Login() {

  const navigate = useNavigate();

  const [selectedRole, setSelectedRole] = useState("");
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedRole) {
      alert("Please select Student or Faculty");
      return;
    }

    try {
      const res = await loginUser({
        ...form,
        role: selectedRole
      });

      const user = res.data;
      localStorage.setItem("user", JSON.stringify(user));

      if (user.role === "STUDENT") {
        navigate("/student-dashboard");
      } else if (user.role === "FACULTY") {
        navigate("/faculty-dashboard");
      }

    } catch {
      alert("Login failed. Check credentials.");
    }
  };

  return (
    <div className="auth-wrapper">

      {/* LEFT PANEL */}
      <div className="auth-left">
        <h1>CareerAssess</h1>
        <p>
          Discover your strengths.  
          Analyze your skills.  
          Build your future.
        </p>
      </div>

      {/* RIGHT PANEL */}
      <div className="auth-right">

        <div className="login-card">

          <h2 className="auth-title">Welcome Back</h2>
          <p className="auth-subtitle">
            Select your role to continue
          </p>

          {/* TWO ROLE CARDS */}
          <div className="role-selection">

            <div
              className={`role-card ${selectedRole === "STUDENT" ? "active" : ""}`}
              onClick={() => setSelectedRole("STUDENT")}
            >
              <div className="role-icon">🎓</div>
              <h4>Student</h4>
              <p>Take assessments & view results</p>
            </div>

            <div
              className={`role-card ${selectedRole === "FACULTY" ? "active" : ""}`}
              onClick={() => setSelectedRole("FACULTY")}
            >
              <div className="role-icon">👨‍🏫</div>
              <h4>Faculty</h4>
              <p>Create & manage assessments</p>
            </div>

          </div>

          {/* FORM APPEARS AFTER SELECT */}
          {selectedRole && (
            <form onSubmit={handleSubmit} className="auth-form fade-in">

              <input
                type="text"
                name="email"
                placeholder="Enter Email"
                onChange={handleChange}
                required
              />

              <input
                type="password"
                name="password"
                placeholder="Enter Password"
                onChange={handleChange}
                required
              />

              <button type="submit" className="auth-btn">
                Login as {selectedRole}
              </button>

            </form>
          )}

        </div>

      </div>
    </div>
  );
}