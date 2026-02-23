import { useEffect, useState } from "react";
import "../styles/studentdashboard.css";
import { getStudentResults } from "../services/api";

export default function Results() {

  const user = JSON.parse(localStorage.getItem("user") || "null");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const loadResults = async () => {
      if (!user?.id) return;

      try {
        const res = await getStudentResults(user.id);
        setResults(res.data);
      } catch (error) {
        console.error("Error loading results", error);
      } finally {
        setLoading(false);
      }
    };

    loadResults();

  }, [user?.id]);

  const getScoreClass = (percentage) => {
    if (percentage >= 85) return "excellent";
    if (percentage >= 70) return "good";
    if (percentage >= 50) return "average";
    return "needs-improvement";
  };

  const getScoreLabel = (percentage) => {
    if (percentage >= 85) return "Excellent";
    if (percentage >= 70) return "Good";
    if (percentage >= 50) return "Average";
    return "Needs Improvement";
  };

  return (
    <div className="results-wrapper">
      <div className="results-header">
        <div className="results-header-content">
          <h2>My Assessment Results</h2>
          <p className="results-subtitle">
            {results.length > 0 
              ? `You have completed ${results.length} assessment${results.length > 1 ? 's' : ''}`
              : 'Your completed assessments will appear here'
            }
          </p>
        </div>
        
        {results.length > 0 && (
          <div className="results-stats-mini">
            <div className="stat-mini">
              <span className="stat-mini-value">{results.length}</span>
              <span className="stat-mini-label">Completed</span>
            </div>
            <div className="stat-mini">
              <span className="stat-mini-value">
                {(results.reduce((acc, r) => acc + r.percentage, 0) / results.length).toFixed(0)}%
              </span>
              <span className="stat-mini-label">Avg Score</span>
            </div>
            <div className="stat-mini">
              <span className="stat-mini-value">
                {Math.max(...results.map(r => r.percentage)).toFixed(0)}%
              </span>
              <span className="stat-mini-label">Best Score</span>
            </div>
          </div>
        )}
      </div>

      {loading ? (
        <div className="results-grid">
          {[1, 2, 3].map((i) => (
            <div key={i} className="assessment-card skeleton-card">
              <div className="skeleton skeleton-text medium"></div>
              <div className="skeleton skeleton-text short"></div>
              <div className="skeleton skeleton-text short"></div>
            </div>
          ))}
        </div>
      ) : results.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          </div>
          <h3>No Results Yet</h3>
          <p>You haven't completed any assessments yet. Start taking assessments to see your results here!</p>
        </div>
      ) : (
        <div className="results-grid">
          {results.map((result, index) => (
            <div 
              key={index} 
              className="assessment-card result-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="result-card-header">
                <div className="student-avatar assessment-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="student-info">
                  <h3>{result.assessmentTitle}</h3>
                  <span className={`status-badge ${getScoreClass(result.percentage)}`}>
                    {getScoreLabel(result.percentage)}
                  </span>
                </div>
              </div>

              <div className="result-card-body">
                <div className="score-section">
                  <div className="score-ring">
                    <svg viewBox="0 0 36 36" className="circular-chart">
                      <path
                        className="circle-bg"
                        d="M18 2.0845
                          a 15.9155 15.9155 0 0 1 0 31.831
                          a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        className={`circle ${getScoreClass(result.percentage)}`}
                        strokeDasharray={`${result.percentage}, 100`}
                        d="M18 2.0845
                          a 15.9155 15.9155 0 0 1 0 31.831
                          a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                    <div className="score-percentage">
                      {result.percentage.toFixed(0)}%
                    </div>
                  </div>
                  
                  <div className="score-details">
                    <div className="score-detail-item">
                      <span className="detail-label">Correct</span>
                      <span className="detail-value correct">{result.correctAnswers}</span>
                    </div>
                    <div className="score-detail-divider">/</div>
                    <div className="score-detail-item">
                      <span className="detail-label">Total</span>
                      <span className="detail-value">{result.totalQuestions}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="result-card-footer">
                <div className="submission-time">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                  <span>Submitted: {new Date(result.submittedAt).toLocaleString()}</span>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}