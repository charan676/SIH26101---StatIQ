import axios from 'axios'

const api = axios.create({ baseURL: 'http://127.0.0.1:8000' })

const logAndThrow = (message, error) => {
  console.error(message, error?.response?.data || error?.message || error)
  throw error
}

export async function generateQuiz(file, competencyCode, title, questionCount, userId) {
  const form = new FormData()
  form.append('file', file)
  if (competencyCode) form.append('competency_code', competencyCode)
  if (title) form.append('title', title)
  if (questionCount) form.append('question_count', questionCount)
  if (userId) form.append('created_by_user_id', userId)

  try {
    const response = await api.post('/api/quizzes/generate', form)
    return response.data
  } catch (error) {
    return logAndThrow('Quiz generation request failed:', error)
  }
}

export async function submitQuiz(userId, quizId, answers) {
  try {
    const response = await api.post('/api/quizzes/submit', {
      user_id: userId,
      quiz_id: quizId,
      answers,
    })
    return response.data
  } catch (error) {
    return logAndThrow('Quiz submission request failed:', error)
  }
}

export async function getDashboardData(userId) {
  try {
    const response = await api.get(`/api/dashboard/${userId}`)
    return response.data
  } catch (error) {
    return logAndThrow('Dashboard request failed:', error)
  }
}
