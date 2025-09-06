import { create } from "zustand";
import axios from "axios";

// Get the API URL from environment variables or fall back to defaults
const API_URL = import.meta.env.VITE_API_URL?.replace(/\/$/, '') || 
  (import.meta.env.PROD ? 'https://trueword-tau.vercel.app/api' : 'http://localhost:5000/api');

console.log('Using API URL:', API_URL); // Debug log

export const useAuthStore = create((set) => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('token') || null,
    loading: false,
    error: null,
    
    login: async (email, password) => {
        set({loading: true, error: null});
        try {
            console.log(`Attempting login to: ${API_URL}/auth/login`);
            const res = await axios.post(`${API_URL}/auth/login`, {email, password});
            console.log('Login response:', res.data);
            
            set({user: res.data.user, token: res.data.token, loading: false});
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            return true;
        }
        catch(err) {
            console.error("Login error:", err.response?.data || err.message);
            set({
                error: err.response?.data?.message || 'Login failed', 
                loading: false
            });
            return false;
        }
    },

    signup: async(username, email, password, company) => {
        set({loading: true, error: null});
        try {
            console.log(`Attempting signup with: ${API_URL}/auth/register`);
            const res = await axios.post(`${API_URL}/auth/register`, {
                username, email, password, company
            });
            console.log('Signup response:', res.data);
            
            set({user: res.data.user, token: res.data.token, loading: false});
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            return true;
        }
        catch(err) {
            console.error("Signup error:", err.response?.data || err.message);
            set({
                error: err.response?.data?.message || err.response?.data?.error || 'Signup failed', 
                loading: false
            });
            return false;
        }
    },

    logout: () => {
        set({user: null, token: null});
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }
}));