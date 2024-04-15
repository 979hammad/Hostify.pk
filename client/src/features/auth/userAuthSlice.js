import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-hot-toast";
const api = "http://localhost:8081/api/v1/user";

export const loginWithGoogle = createAsyncThunk("user/loginWithGoogle", async () => {
  try {
    const response = await axios.get(`http://localhost:8081/login/success`, {
      withCredentials: true, 
      headers :{
      Accept : "application/json",
      "Content-Type" : "application/json",
      "Access-Control-Allow-Credentials" : true
    }});
    localStorage.setItem("token", response.data.token);
    return response?.data?.user._json;

  } catch (error) {
    throw error?.response?.data;
  }
})

export const signUpUser = createAsyncThunk("user/signUpUser", async (data) => {
  try {

    const response = await axios.post(`${api}/signup`, data);
    localStorage.setItem("userId", response.data.newUser._id);
    localStorage.setItem("token", response.data.token);
    return response?.data;

  } catch (error) {
    throw error?.response?.data;
  }
})

export const verifyOTP = createAsyncThunk("user/verifyOTP", async (otp) => {
  try {
    const userId = localStorage.getItem("userId");
    const data = {
      otp,
      userId
    }
    const response = await axios.post(`${api}/verifyotp`, data)

    return response.data;
  } catch (error) {
    throw error.response.data
  }
})

export const loginUser = createAsyncThunk("user/loginUser", async (data) => {
  try {
    const response = await axios.post(`${api}/login`, data)
    localStorage.setItem("token", response?.data.token);
    return response?.data;
  } catch (error) {
    throw error.response.data
  }
})

export const myProfile = createAsyncThunk("user/myProfile", async () => {
  try {
    const token = localStorage.getItem("token");

    const headers = {
      Authorization: `Bearer ${token}`
    };

    const response = await axios.get(`${api}/myprofile`, { headers })

    return response.data.user;
  } catch (error) {
    throw error.response.data
  }
})

export const updateProfile = createAsyncThunk("user/updateProfile", async (data) => {
  try {
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`
    };
    const response = await axios.post(`${api}/editprofile`, data, { headers })

    return response?.data?.user;
  } catch (error) {
    throw error.response?.data
  }
})

export const changePassword = createAsyncThunk("user/changePassword", async (data) => {
  try {
    const token = localStorage.getItem("token");

    const headers = {
      Authorization: `Bearer ${token}`
    };

    const response = await axios.post(`${api}/changepassword`, data, { headers })

    return response?.data?.msg;
  } catch (error) {
    throw error.response.data
  }
})

export const deleteAccount = createAsyncThunk("user/deleteAccount", async () => {
  try {
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`
    };

    localStorage.removeItem("token");
    const response = await axios.delete(`${api}/deleteuseraccount`, { headers })
    
    return response.data.msg;
  } catch (error) {
    throw error.response.data
  }
})

export const logoutUser = createAsyncThunk("user/logoutUser", async () => {
  try {
    window.open("http://localhost:8081/logout", "_self");
    localStorage.removeItem("token");
    toast.success("Logged out");
  } catch (error) {
    console.log(error)
  }
})

const initialState = {
  otpSending: "idle",
  resendOTP: "idle",
  userLogin: "idle",
  userGetting: "idle",
  profileUpdating: "idle",
  changingPass: "idle",
  deletingAccount: "idle",
  user: {}
}

export const userAuthSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginWithGoogle.pending, (state, action) => {
        
      })
      .addCase(loginWithGoogle.fulfilled, (state, action) => {
        state.user = action.payload
      })
      .addCase(loginWithGoogle.rejected, (state, action) => {
        // toast.error(action.error.message)
      })
      .addCase(signUpUser.pending, (state, action) => {
        state.otpSending = "pending"
      })
      .addCase(signUpUser.fulfilled, (state, action) => {

        state.otpSending = "success"
        state.user = action.payload.newUser
        console.log(action.payload.newUser)
      })
      .addCase(signUpUser.rejected, (state, action) => {

        state.otpSending = "resend"
        toast.error(action.error.message)
      })
      .addCase(verifyOTP.pending, (state, action) => {
        state.resendOTP = "idle"
      })
      .addCase(verifyOTP.fulfilled, (state, action) => {
        state.resendOTP = "success"
        toast.success("Account Created Successfully")
      })
      .addCase(verifyOTP.rejected, (state, action) => {
        state.resendOTP = "resend",
          toast.error(action.error.message)
      })
      .addCase(loginUser.pending, (state, action) => {
        state.userLogin = "idle"
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.userLogin = "success"
        toast.success("Login Success")
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.userLogin = "resend",
          toast.error(action.error.message)
      })
      .addCase(myProfile.pending, (state, action) => {
        state.userGetting = "idle"
      })
      .addCase(myProfile.fulfilled, (state, action) => {
        state.userGetting = "success"
        state.user = action.payload;
      })
      .addCase(myProfile.rejected, (state, action) => {
        state.userGetting = "resend",
          toast.error(action.error.message)
      })
      .addCase(updateProfile.pending, (state, action) => {
        state.profileUpdating = "pending"
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.profileUpdating = "idle"
        state.user = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.profileUpdating = "idle",
          toast.error(action.error.message)
      })
      .addCase(changePassword.pending, (state, action) => {
        state.changingPass = "pending"
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.changingPass = "idle"
        toast.success("Password Changed")
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.changingPass = "idle",
          toast.error(action.error.message)
      })
      .addCase(deleteAccount.pending, (state, action) => {
        state.deletingAccount = "pending"
      })
      .addCase(deleteAccount.fulfilled, (state, action) => {
        state.deletingAccount = "success"
        toast.success(action.payload)
      })
      .addCase(deleteAccount.rejected, (state, action) => {
        state.deletingAccount = "idle",
          toast.error(action.error.message)
      })
  }
})

export const otpSending = (state) => state.otpSending;
export const resendOTP = (state) => state.resendOTP;
export const userLogin = (state) => state.userLogin;
export const user = (state) => state.user;
export const profileUpdating = (state) => state.profileUpdating;
export const changingPass = (state) => state.changingPass;
export const deletingAccount = (state) => state.deletingAccount;

export default userAuthSlice.reducer;
