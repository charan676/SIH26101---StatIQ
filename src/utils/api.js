export const API_BASE_URL = 'http://127.0.0.1:8000';

const handleResponse = async (response, errorMessage) => {
  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({ detail: response.statusText }));
    console.error(errorMessage, errorBody);
    throw new Error(errorBody.detail || errorMessage);
  }
  return response.json();
};

export async function generateQuiz(file, competencyCode, title, questionCount = 5, userId = 1) {
  const form = new FormData();
  form.append('file', file);
  if (competencyCode) form.append('competency_code', competencyCode);
  if (title) form.append('title', title);
  if (questionCount) form.append('question_count', String(questionCount));
  if (userId) form.append('created_by_user_id', String(userId));

  const response = await fetch(`${API_BASE_URL}/api/quizzes/generate`, {
    method: 'POST',
    body: form,
  });
  return handleResponse(response, 'Quiz generation request failed:');
}

export async function submitQuiz(userId, quizId, answers) {
  const response = await fetch(`${API_BASE_URL}/api/quizzes/submit`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      user_id: Number(userId),
      quiz_id: Number(quizId),
      answers: answers,
    }),
  });
  return handleResponse(response, 'Quiz submission request failed:');
}

export async function getDashboardData(userId = 1) {
  const response = await fetch(`${API_BASE_URL}/api/dashboard/${userId}`);
  return handleResponse(response, 'Dashboard request failed:');
}

export async function getProfileData(userId = 1) {
  const response = await fetch(`${API_BASE_URL}/api/profiles/${userId}`);
  return handleResponse(response, 'Profile request failed:');
}

export async function loginAuth(email, role) {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, role }),
  });
  return handleResponse(response, 'Auth login request failed:');
}

export async function getCompetencyProfile(userId = 1) {
  const response = await fetch(`${API_BASE_URL}/api/profiles/${userId}/competencies`);
  return handleResponse(response, 'Competency profile request failed:');
}
