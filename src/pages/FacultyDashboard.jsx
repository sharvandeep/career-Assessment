import "../styles/facultydashboard.css";
import { useNavigate } from "react-router-dom";

export default function FacultyDashboard() {

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")) || {};

  return (
    <div className="fd-wrapper">
      <div className="fd-container">

        <div className="fd-header">
          <div className="fd-header-content">
            <h2>Faculty Dashboard</h2>
            <p>Manage assessments and track student progress</p>
            <div className="welcome-badge">
              <div className="avatar">
                {user.name?.charAt(0).toUpperCase() || 'F'}
              </div>
              <span>Welcome back, {user.name || 'Faculty'}</span>
            </div>
          </div>
          
          <div className="fd-stats">
            <div className="fd-stat-card">
              <div className="fd-stat-value">--</div>
              <div className="fd-stat-label">Assessments</div>
            </div>
            <div className="fd-stat-card">
              <div className="fd-stat-value">--</div>
              <div className="fd-stat-label">Students</div>
            </div>
          </div>
        </div>

        <div className="fd-row">

          {/* CREATE ASSESSMENT */}
          <div className="fd-card">
            <div className="fd-card-icon create">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14M5 12h14" />
              </svg>
            </div>
            <h3>Create Assessment</h3>
            <p>
              Design and publish new career assessment tests tailored for your students.
            </p>
            <button
              className="fd-btn primary"
              onClick={() => navigate("/faculty/create-assessment")}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14M5 12h14" />
              </svg>
              Create Assessment
            </button>
          </div>

          {/* VIEW RESULTS */}
          <div className="fd-card">
            <div className="fd-card-icon results">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3>View Results</h3>
            <p>
              Review student submissions, evaluate answers and track performance metrics.
            </p>
            <button
              className="fd-btn success"
              onClick={() => navigate("/faculty/results")}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              View Results
            </button>
          </div>

        </div>

        {/* ANALYTICS CARD */}
        <div className="fd-card fd-full">
          <span className="coming-soon-badge">Coming Soon</span>
          <div className="fd-card-icon analytics">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
              <path d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
            </svg>
          </div>
          <h3>Analytics & Reports</h3>
          <p>
            Analyze student performance with detailed charts, generate insights, and export comprehensive reports.
          </p>
          <button className="fd-btn disabled" disabled>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 15v2m0 0v2m0-2h2m-2 0H10m2-7a2 2 0 100-4 2 2 0 000 4z" />
              <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            </svg>
            Coming Soon
          </button>
        </div>

        {/* QUICK ACTIONS */}
        <div className="fd-quick-actions">
          <h4>Quick Actions</h4>
          <div className="quick-actions-grid">
            <button className="quick-action-btn" onClick={() => navigate("/faculty/create-assessment")}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14M5 12h14" />
              </svg>
              New Assessment
            </button>
            <button className="quick-action-btn" onClick={() => navigate("/faculty/results")}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              All Results
            </button>
            <button className="quick-action-btn" disabled style={{ opacity: 0.5 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              Manage Students
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}