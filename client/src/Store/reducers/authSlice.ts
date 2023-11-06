import { Iuser } from './../../types/types';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from '../../utils/axios';
import { authState, loginParams, registerParams } from "../../types/types";

const initialState: authState = {
    user: null,
    token: null,
    isLoading: false,
    status: null,
}

export const registerUser = createAsyncThunk('auth/registerUser', 
    async({username, password, email, name}: registerParams) => {
        try {
            const { data } = await axios.post('/auth/registration', {
                username, password, email, name
            })
            if (data.token) {
                window.localStorage.setItem('token', data.token)
            }

            return data
        } catch (e) {
            console.log(e)
        }
})

export const loginUser = createAsyncThunk('auth/loginUse', 
    async({password, email}: loginParams) => {
        try {
            const { data } = await axios.post('/auth/login', {
              password, email
            })
            if (data.token) {
                window.localStorage.setItem('token', data.token)
            }

            return data
        } catch (e) {
            console.log(e)
        }
})

export const getMe = createAsyncThunk('auth/getMe', 
  async() => {
    try {
      const { data } = await axios.get('/auth/getuser')
      return data
    } catch (e) {
      console.log(e)
    }
})

export const updateUsername = createAsyncThunk('auth/updateUsername', async (newUsername: string) => {
  try {
    const { data } = await axios.patch('/auth/updateusername', { newUsername });
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
});

export const updateEmail = createAsyncThunk('auth/updateEmail', async (newEmail: string) => {
  try {
    const { data } = await axios.patch('/auth/updateemail', { newEmail });
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
});

export const updateName = createAsyncThunk('auth/updateName', async (newName: string) => {
  try {
    const { data } = await axios.patch('/auth/updatename', { newName });
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
});

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      logout: (state) => {
        state.token = null;
        state.user = null;
        state.isLoading = false;
        state.status = null;
      }
    },
    extraReducers: (builder) => {
        //Register
          builder.addCase(registerUser.pending, (state) => {
            state.isLoading = true;
            state.status = null
          });
          builder.addCase(registerUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.status = action.payload.message
            state.user = action.payload.user
            state.token = action.payload.token
          });
          builder.addCase(registerUser.rejected, (state, action: any) => {
            state.isLoading = false;
            state.status = action.payload.message || 'Произошла ошибка'
          });

          //login
          builder.addCase(loginUser.pending, (state) => {
            state.isLoading = true;
            state.status = null
          });
          builder.addCase(loginUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.status = action.payload.message
            state.user = action.payload.user
            state.token = action.payload.token
          });
          builder.addCase(loginUser.rejected, (state, action: any) => {
            state.isLoading = false;
            state.status = action.payload.message || 'Произошла ошибка'
          });

        //проверка авторизации
          builder.addCase(getMe.pending, (state) => {
            state.isLoading = true;
            state.status = null
          });
          builder.addCase(getMe.fulfilled, (state, action) => {
            state.isLoading = false;
            state.status = null
            state.user = action.payload?.user
            state.token = action.payload?.token
          });
          builder.addCase(getMe.rejected, (state, action: any) => {
            state.isLoading = false;
            state.status = action.payload.message || 'Произошла ошибка'
          });

          //changeName , Email , Username
          builder.addCase(updateEmail.pending, (state) => {
            state.isLoading = true;
            state.status = null
          });
          builder.addCase(updateEmail.fulfilled, (state, action) => {
            state.isLoading = false;
            state.status = action.payload.message
          });
          builder.addCase(updateEmail.rejected, (state, action: any) => {
            state.isLoading = false;
            state.status = action.payload.message || 'Произошла ошибка'
          });

          builder.addCase(updateName.pending, (state) => {
            state.isLoading = true;
            state.status = null
          });
          builder.addCase(updateName.fulfilled, (state, action) => {
            state.isLoading = false;
            state.status = action.payload.message
          });
          builder.addCase(updateName.rejected, (state, action: any) => {
            state.isLoading = false;
            state.status = action.payload.message || 'Произошла ошибка'
          });

          builder.addCase(updateUsername.pending, (state) => {
            state.isLoading = true;
            state.status = null
          });
          builder.addCase(updateUsername.fulfilled, (state, action) => {
            state.isLoading = false;
            state.status = action.payload.message
          });
          builder.addCase(updateUsername.rejected, (state, action: any) => {
            state.isLoading = false;
            state.status = action.payload.message || 'Произошла ошибка'
          });

}})

export const checkIsAuth = (state: authState) => Boolean(state.token);
export const {logout} = authSlice.actions
export default authSlice.reducer