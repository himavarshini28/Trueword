import { create } from "zustand";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL?.replace(/\/$/, '')  || 'http://localhost:5000/api';

export const useAuthStore = create ((set)=>(
    {
    
        user:null,
        token:localStorage.getItem('token') || null,
        loading : false,
        error: null,
        
        login: async (email ,password)=>{
            set({loading:true, error:null});
            try{
                const res = await axios.post(`${API_URL}/auth/login`,{email,password});
                set({user: res.data.user, token : res.data.token, loading:false});
                localStorage.setItem('token', res.data.token);
                return true;
            }
            catch(err)
            {
                set({
                    error: err.response?.data?.message || 'Login failed', loading:false
                });
                return false;
            }
        },

        signup: async(username, email, password, company)=>
        {
            set({loading:true, error: null});
            try{
                const res= await axios.post(`${API_URL}/auth/register`, {username, email, password, company});

                set({user:res.data.user, token: res.data.token, loading:false});

                localStorage.setItem('token', res.data.token);
                return true;
            }
            catch(err)
            {
                set({error: err.response?.data?.error || 'Signup failed', loading :false});
                return false;
            }
        },

        logout : ()=>{
            set({user:null, token:null});
            localStorage.removeItem('token');
        }


    }
));