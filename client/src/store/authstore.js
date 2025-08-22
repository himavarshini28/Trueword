import { create } from "zustand";
import axios from "axios";

export const useAuthStore = create ((set)=>(
    {
        user:null,
        token:localStorage.getItem('token') || null,
        loading : false,
        error: null,
        
        login: async (email ,password)=>{
            set({loading:true, error:null});
            try{
                const res = await axios.post('http://localhost:/api/auth/login',{email,password});
                set({user: res.data.user, token : res.data.token, loading:false});
            }
            catch(err)
            {
                set({
                    error: err.response?.data?.error || 'Login failed', loading:false
                });
            }
        },

        signup: async(username, email, password, company)=>
        {
            set({loading:true, error: null});
            try{
                const res= await axios.post('http://localhost:5000/api/auth/register', {username, email, password, company});

                set({user:res.data.user, token: res.data.token, loading:false});

                localStorage.setItem('token', res.data.token);
            }
            catch(err)
            {
                set({error: err.response?.data?.error || 'Signup failed', loading :false});
            }
        },

        logout : ()=>{
            set({user:null, token:null});
            localStorage.removeItem('token');
        }


    }
));