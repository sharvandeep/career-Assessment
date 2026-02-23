import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getStudentAnswerReview } from "../services/api";

export default function StudentAnswerReview() {

  const { assessmentId, studentId } = useParams();
  const [review, setReview] = useState(null);

  useEffect(() => {

    const loadReview = async () => {
      try {
        const res = await getStudentAnswerReview(
          assessmentId,
          studentId
        );
        setReview(res.data);
      } catch (error) {
        console.error("Error loading review", error);
      }
    };

    loadReview();

  }, [assessmentId, studentId]);

  if (!review) return <p>Loading...</p>;

  return (
    <div className="dashboard-container">
      <h2>Student Answer Review</h2>

      {review.questions.map((q, index) => (
        <div key={index} className="assessment-card">

          <h4>{index + 1}. {q.questionText}</h4>

          <p>
            Student Answer:
            <strong
              style={{
                color: q.marks === 1 ? "green" : "red"
              }}
            >
              {" "}{q.studentAnswer}
            </strong>
          </p>

          <p>Correct Answer: {q.correctAnswer}</p>

          <p>
            Marks: {q.marks === 1 ? "1 ✔" : "0 ❌"}
          </p>

        </div>
      ))}

      <div className="assessment-card">
        <h3>Summary</h3>
        <p>Total Questions: {review.totalQuestions}</p>
        <p>Correct Answers: {review.correctAnswers}</p>
        <p>Wrong Answers: {review.wrongAnswers}</p>
        <p>Percentage: {review.percentage.toFixed(2)}%</p>
      </div>
    </div>
  );
}