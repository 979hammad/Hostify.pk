import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-hot-toast";
const api = "http://localhost:8081/api/v1/hostel";

export const hostelImagesData = createAsyncThunk('hostel/hostelImagesData', async (data) => {
    try{
      const token = localStorage.getItem("token");
      const headers = {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`
      };
      
      const response = await axios.post(`${api}/new/register-hostel-images`, data, { headers });
      const responseData = response.data;
      localStorage.setItem("imagesModelId", response.data.imagesModelId)
      return responseData;      
    }catch(error){
      throw error
    }
});


export const registerHostel = createAsyncThunk('hostel/registerHostel', async () => {
  try {
    const token = localStorage.getItem("token");
    // Retrieve form data from localStorage
    const formData = {
      basicInfo: localStorage.getItem("hostelBasicInfo"),
      typeAndContact: localStorage.getItem("TypeAndContact"),
      facilities: localStorage.getItem("facilities"),
      rules: localStorage.getItem("rules"),
      roomCharges: localStorage.getItem("roomCharges"),
      manualAddress: localStorage.getItem("manualAddress"),
      // imagesModelId : localStorage.getItem("imagesModel")
    }

    const headers = {
      Authorization: `Bearer ${token}`
    };
    
    const response = await axios.post(`${api}/new/register-hostel`, formData, { headers });
    const responseData = response.data;

    localStorage.removeItem("hostelBasicInfo");
    localStorage.removeItem("TypeAndContact");
    localStorage.removeItem("facilities");
    localStorage.removeItem("rules");
    localStorage.removeItem("roomCharges");
    localStorage.removeItem("manualAddress");

    return responseData;
  } catch (error) {
    throw error;
  }
});

const initialState = {
  hostel: null,
  hLoading: "idle",
}

export const registerHostelSlice = createSlice({
  name: "hostel",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerHostel.pending, (state, action) => {
        state.hLoading = "pending"

      })
      .addCase(registerHostel.fulfilled, (state, action) => {
        state.hLoading = "idle"
        toast.success("Data Saved Successfully")
      })
      .addCase(registerHostel.rejected, (state, action) => {
        state.hLoading = "idle"
        toast.error("Kindly Register Again")
      })
      .addCase(hostelImagesData.pending, (state, action) => {
        state.hLoading = "pending"
      })
      .addCase(hostelImagesData.fulfilled, (state, action) => {
        state.hLoading = "success"
      })
      .addCase(hostelImagesData.rejected, (state, action) => {
        state.hLoading = "idle"
        toast.error("Unable to upload Images")
      })
  }
})

export const hLoading = (state) => state.hLoading;

export default registerHostelSlice.reducer;