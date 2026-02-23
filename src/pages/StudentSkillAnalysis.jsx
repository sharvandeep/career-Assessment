import { useEffect, useState } from "react";
import { getSkillAnalysis } from "../services/api";
import "../styles/studentdashboard.css";

export default function StudentSkillAnalysis() {

  const user = JSON.parse(localStorage.getItem("user")) || {};
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const loadSkills = async () => {

      if (!user?.id) return;

      try {
        const res = await getSkillAnalysis(user.id);
        setSkills(res.data);
      } catch (error) {
        console.error("Skill Analysis Error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadSkills();

  }, [user?.id]);

  const getColor = (percentage) => {
    if (percentage >= 70) return "#22c55e";   // green
    if (percentage >= 40) return "#f59e0b";   // yellow
    return "#ef4444";                         // red
  };

  // 🔥 Strength Classification
  const strongSkills = skills.filter(s => s.percentage >= 70);
  const moderateSkills = skills.filter(
    s => s.percentage >= 40 && s.percentage < 70
  );
  const weakSkills = skills.filter(s => s.percentage < 40);

  // 🚀 Career Recommendation Logic
  const getCareerSuggestions = () => {

    const suggestions = [];

    if (strongSkills.some(s => s.skill === "PROGRAMMING")) {
      suggestions.push("Software Developer");
      suggestions.push("Backend Engineer");
      suggestions.push("Full Stack Developer");
    }

    if (strongSkills.some(s => s.skill === "APTITUDE")) {
      suggestions.push("Data Analyst");
      suggestions.push("Competitive Exams (Banking/Govt)");
    }

    if (strongSkills.some(s => s.skill === "COMMUNICATION")) {
      suggestions.push("HR Specialist");
      suggestions.push("Business Analyst");
    }

    if (strongSkills.some(s => s.skill === "CORE")) {
      suggestions.push("Core Engineering Roles");
    }

    return suggestions;
  };

  const careerSuggestions = getCareerSuggestions();

  return (
    <div className="sd-wrapper">
      <div className="sd-container">

        <div className="sd-header">
          <h2>Skill Analysis</h2>
          <p>Your performance by skill category</p>
        </div>

        {loading ? (
          <p>Loading skill analysis...</p>
        ) : skills.length === 0 ? (
          <p>No assessment data available yet.</p>
        ) : (
          <>
            {/* 🔥 Performance Summary */}
            <div className="sd-card sd-full">
              <h3>Performance Summary</h3>

              <p>
                <strong>🟢 Strong Skills:</strong>{" "}
                {strongSkills.length > 0
                  ? strongSkills.map(s => s.skill).join(", ")
                  : "None"}
              </p>

              <p>
                <strong>🟡 Moderate Skills:</strong>{" "}
                {moderateSkills.length > 0
                  ? moderateSkills.map(s => s.skill).join(", ")
                  : "None"}
              </p>

              <p>
                <strong>🔴 Needs Improvement:</strong>{" "}
                {weakSkills.length > 0
                  ? weakSkills.map(s => s.skill).join(", ")
                  : "None"}
              </p>
            </div>

            {/* 🚀 Career Recommendations */}
            <div className="sd-card sd-full">
              <h3>Recommended Career Paths</h3>

              {careerSuggestions.length > 0 ? (
                <ul>
                  {careerSuggestions.map((career, index) => (
                    <li key={index}>{career}</li>
                  ))}
                </ul>
              ) : (
                <p>No strong skill identified yet. Keep practicing!</p>
              )}
            </div>

            {/* 🔥 Skill Breakdown Cards */}
            {skills.map((skill, index) => (
              <div key={index} className="sd-card">

                <h3>{skill.skill}</h3>

                <p>
                  {skill.correct} / {skill.total} correct
                </p>

                <div
                  style={{
                    background: "#e5e7eb",
                    borderRadius: "8px",
                    height: "18px",
                    marginTop: "10px"
                  }}
                >
                  <div
                    style={{
                      width: `${skill.percentage}%`,
                      background: getColor(skill.percentage),
                      height: "100%",
                      borderRadius: "8px",
                      transition: "0.5s"
                    }}
                  />
                </div>

                <p style={{ marginTop: "8px" }}>
                  {skill.percentage.toFixed(2)} %
                </p>

              </div>
            ))}
          </>
        )}

      </div>
    </div>
  );
}