import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getStudentHistory } from "../services/api";
import "../styles/global.css";

export default function StudentHistory() {

  const user = JSON.parse(localStorage.getItem("user") || "null");
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {

    const loadHistory = async () => {
      if (!user?.id) return;

      try {
        const res = await getStudentHistory(user.id);
        setHistory(res.data);
      } catch (error) {
        console.error("Error loading history:", error);
      }
    };

    loadHistory();

  }, [user?.id]);

  return (
    <div className="dashboard-container">

      <h2>Assessment History</h2>

      {history.length === 0 ? (
        <p>No assessments attempted yet.</p>
      ) : (
        history.map((item, index) => (
          <div key={index} className="assessment-card">

            <h3>{item.assessmentTitle}</h3>

            <p>
              Score: {item.correctAnswers} / {item.totalQuestions}
            </p>

            <p>
              Percentage: {item.percentage.toFixed(2)}%
            </p>

            <p>
              Attempted On: {new Date(item.submittedAt).toLocaleString()}
            </p>

            <button
              onClick={() =>
                navigate(`/student/review/${item.assessmentId}/${user.id}`)
              }
            >
              View Detailed Review
            </button>

          </div>
        ))
      )}

    </div>
  );
}