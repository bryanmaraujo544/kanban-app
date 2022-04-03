import axios from 'axios';

const api = axios.create({
  baseURL: 'https://kanban-api-b.herokuapp.com/',
});

export default api;
