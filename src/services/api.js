import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8081",
  headers: {
    "Content-Type": "application/json",
  },
});


// =======================
// USER AUTH
// =======================

export const registerUser = (data) => {
  return api.post("/users/register", data);
};

export const loginUser = (data) => {
  return api.post("/users/login", data);
};


// =======================
// STUDENT
// =======================

export const getStudentAssessments = (studentId) => {
  return api.get(`/student/assessments/${studentId}`);
};

export const getAssessmentQuestions = (assessmentId) => {
  return api.get(`/student/assessment/${assessmentId}/questions`);
};

export const submitAssessment = (data) => {
  return api.post("/student/submit", data);
};
export const getStudentResults = (studentId) => {
  return api.get(`/student/results/${studentId}`);
};

// ============================
// FACULTY RESULTS
// ============================

export const getFacultyAssessments = (facultyId) => {
  return api.get(`/faculty/assessment/${facultyId}`);
};

export const getAssessmentResults = (assessmentId) => {
  return api.get(`/faculty/assessment/${assessmentId}/results`);
};

export const getStudentAnswerReview = (assessmentId, studentId) => {
  return api.get(
    `/faculty/assessment/${assessmentId}/student/${studentId}`
  );
};
export const getStudentHistory = (studentId) => {
  return api.get(`/student/results/${studentId}`);
};
export const getStudentDetailedReview = (assessmentId, studentId) => {
  return api.get(
    `/student/assessment/${assessmentId}/review/${studentId}`
  );
};
export const getSkillAnalysis = (studentId) => {
  return api.get(`/student/skill-analysis/${studentId}`);
};
export const getBranchSkills = (branchId) =>
  api.get(`/skills/${branchId}`);

export default api;