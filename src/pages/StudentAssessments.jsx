import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/studentdashboard.css";
import { getStudentAssessments } from "../services/api";

export default function StudentAssessments() {

  const [assessments, setAssessments] = useState([]);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {

    const loadAssessments = async () => {
      if (!user?.id) return;

      try {
        const res = await getStudentAssessments(user.id);
        setAssessments(res.data);
      } catch (error) {
        console.error("Error fetching assessments", error);
      }
    };

    loadAssessments();

  }, [user?.id]);

  return (
    <div className="assessment-wrapper">

      <div className="dashboard-header">
        <h1>Available Assessments</h1>
        <p>Select an assessment to begin</p>
        <div className="sd-stats">

  <div className="stat-card">
    <h4>Assessments</h4>
    <p>3</p>
  </div>

  <div className="stat-card">
    <h4>Completed</h4>
    <p>2</p>
  </div>

  <div className="stat-card">
    <h4>Top Score</h4>
    <p>88%</p>
  </div>

</div>
      </div>

      <div className="assessment-grid">

        {assessments.length === 0 ? (

          <div className="no-data-card">
            <h3>No Assessments Assigned</h3>
            <p>Your faculty hasn’t assigned any assessments yet.</p>
          </div>

        ) : (

          assessments.map((assessment) => (

            <div key={assessment.id} className="assessment-card">

              <h3>{assessment.title}</h3>
              <p>{assessment.description}</p>

              <div className="assessment-meta">
                <span>Faculty: {assessment.facultyName}</span>
                <span>
                  Created: {new Date(assessment.createdAt).toLocaleDateString()}
                </span>
              </div>

              <button
                className="primary-btn"
                onClick={() =>
                  navigate(`/student/attempt/${assessment.id}`)
                }
              >
                Start Assessment
              </button>

            </div>

          ))

        )}

      </div>

    </div>
  );
}