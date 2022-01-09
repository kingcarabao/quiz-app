import axios from 'axios';

const localHttp = axios.create({
  baseURL: process.env.REACT_APP_API_LOCAL_URL,
});

localHttp.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

const quizHttp = axios.create({ baseURL: process.env.REACT_APP_API_QUIZ_URL });

quizHttp.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export { localHttp, quizHttp };
export default localHttp;
