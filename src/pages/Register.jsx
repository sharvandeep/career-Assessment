import { useState } from "react";
import { Link } from "react-router-dom";
import { registerUser } from "../services/api";
import "../styles/auth.css";

export default function Register() {

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "STUDENT",
    branchName: "CSE"
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await registerUser(form);
      alert("Registered Successfully");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-wrapper">
      {/* LEFT BRAND PANEL */}
      <div className="auth-left">
        <div className="auth-left-content">
          <div className="brand-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
              <path d="M6 12v5c3 3 9 3 12 0v-5" />
            </svg>
          </div>
          <h1>CareerAssess</h1>
          <p>
            Create your account.<br />
            Start your career journey.<br />
            Unlock your potential.
          </p>
          <div className="auth-features">
            <div className="feature-item">
              <div className="feature-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span>Skill Assessment</span>
            </div>
            <div className="feature-item">
              <div className="feature-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <span>Progress Tracking</span>
            </div>
            <div className="feature-item">
              <div className="feature-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span>Instant Results</span>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT REGISTER PANEL */}
      <div className="auth-right">
        <div className="login-card register-card">
          <div className="card-header">
            <div className="header-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M19 8v6M22 11h-6" />
              </svg>
            </div>
            <h2 className="auth-title">Create Account</h2>
            <p className="auth-subtitle">
              Join the platform and explore career insights
            </p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form register-form">
            <div className="input-group">
              <div className="input-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <input
                name="name"
                placeholder="Full Name"
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <div className="input-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <path d="M22 6l-10 7L2 6" />
                </svg>
              </div>
              <input
                name="email"
                type="email"
                placeholder="Email Address"
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <div className="input-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0110 0v4" />
                </svg>
              </div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                required
              />
            </div>

            <div className="select-row">
              <div className="select-group">
                <label>Role</label>
                <div className="select-wrapper">
                  <select name="role" onChange={handleChange}>
                    <option value="STUDENT">🎓 Student</option>
                    <option value="FACULTY">👨‍🏫 Faculty</option>
                  </select>
                  <div className="select-arrow">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="select-group">
                <label>Branch</label>
                <div className="select-wrapper">
                  <select name="branchName" onChange={handleChange}>
                    <option value="CSE">CSE</option>
                    <option value="ECE">ECE</option>
                    <option value="CSIT">CSIT</option>
                    <option value="AIDS">AIDS</option>
                    <option value="MECH">MECH</option>
                    <option value="BIO-TECH">BIO-TECH</option>
                  </select>
                  <div className="select-arrow">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <button type="submit" className="auth-btn" disabled={isSubmitting}>
              {isSubmitting ? (
                <span className="btn-loading">
                  <span className="spinner"></span>
                  Creating Account...
                </span>
              ) : (
                <span className="btn-content">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M19 8v6M22 11h-6" />
                  </svg>
                  Create Account
                </span>
              )}
            </button>
          </form>

          <div className="auth-footer">
            <span>Already have an account?</span>
            <Link to="/login">Sign In</Link>
          </div>

          <div className="auth-divider">
            <span>Secure & Encrypted</span>
          </div>
        </div>
      </div>
    </div>
  );
}
