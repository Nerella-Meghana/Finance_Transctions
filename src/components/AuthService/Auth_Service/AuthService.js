import {loginaxios} from "../../../axios"


export const AuthService = {
  login: async (userName, password) => {
    try {
      const response = await loginaxios.post('/api/login', { userName, password });
      return response.data;
    } catch (error) {
      throw new Error('Login failed');
    }
  },

  register: async (username, email, password, confirmPassword) => {
    try {
      const response = await loginaxios.post('/api/register', { username, email, password, confirmPassword });
      return response;
    } catch (error) {
      throw new Error('Registration failed');
    }
  },

  setToken: (token) => {
    localStorage.setItem('token', token);
  },

  getToken: () => {
    return localStorage.getItem('token');
  },

  clearToken: () => {
    localStorage.removeItem('token');
  },
};




