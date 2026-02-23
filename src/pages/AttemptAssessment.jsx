import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getAssessmentQuestions,
  submitAssessment
} from "../services/api";
import "../styles/attempt.css";

export default function AttemptAssessment() {

  const { assessmentId } = useParams();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  // ==========================
  // Load Questions
  // ==========================
  useEffect(() => {

    const loadQuestions = async () => {
      try {
        const res = await getAssessmentQuestions(assessmentId);
        setQuestions(res.data);
      } catch (error) {
        console.error("Error loading questions", error);
      } finally {
        setLoading(false);
      }
    };

    loadQuestions();

  }, [assessmentId]);

  // ==========================
  // Handle Option Select
  // ==========================
  const handleSelect = (questionId, option) => {
    setAnswers({
      ...answers,
      [questionId]: option
    });
  };

  // ==========================
  // Navigation
  // ==========================
  const handleNext = () => {
    if (!answers[questions[currentIndex].id]) {
      alert("Please select an answer before proceeding.");
      return;
    }

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // ==========================
  // Submit Assessment
  // ==========================
  const handleSubmit = async () => {

    const formattedAnswers = Object.keys(answers).map(qId => ({
      questionId: parseInt(qId),
      selectedAnswer: answers[qId]
    }));

    try {

      const res = await submitAssessment({
        studentId: user.id,
        assessmentId: parseInt(assessmentId),
        answers: formattedAnswers
      });

      alert(
        `Score: ${res.data.correctAnswers}/${res.data.totalQuestions}\nPercentage: ${res.data.percentage.toFixed(2)}%`
      );

      navigate("/student-dashboard");

    } catch (error) {
      alert(error.response?.data?.message || "Submission failed");
    }
  };

  if (loading) return <h2>Loading Questions...</h2>;

  const currentQuestion = questions[currentIndex];

  return (
    <div className="exam-wrapper">

      {/* HEADER */}
      <div className="exam-header">
        <div className="exam-title">
          Assessment
        </div>

        <div className="exam-progress">
          <span>
            Question {currentIndex + 1} / {questions.length}
          </span>

          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{
                width: `${((currentIndex + 1) / questions.length) * 100}%`
              }}
            />
          </div>
        </div>
      </div>

      {/* QUESTION AREA */}
      <div className="exam-content">

        <div className="question-box">

          <h3>
            {currentIndex + 1}. {currentQuestion.questionText}
          </h3>

          <div className="options-container">
            {["A", "B", "C", "D"].map(letter => {

              const optionValue =
                currentQuestion["option" + letter.toLowerCase()];

              return (
                <button
                  key={letter}
                  className={`option-btn ${
                    answers[currentQuestion.id] === letter ? "selected" : ""
                  }`}
                  onClick={() => handleSelect(currentQuestion.id, letter)}
                >
                  <span className="option-letter">{letter}</span>
                  {optionValue}
                </button>
              );
            })}
          </div>

        </div>

      </div>

      {/* FOOTER */}
      <div className="exam-footer">

        <button
          className="nav-btn exit-btn"
          onClick={() => navigate("/student-dashboard")}
        >
          Exit
        </button>

        <div className="nav-group">

          <button
            className="nav-btn"
            disabled={currentIndex === 0}
            onClick={handlePrevious}
          >
            Back
          </button>

          <button
            className="nav-btn primary-btn"
            onClick={handleNext}
          >
            {currentIndex === questions.length - 1
              ? "Submit"
              : "Next"}
          </button>

        </div>

      </div>

    </div>
  );
}