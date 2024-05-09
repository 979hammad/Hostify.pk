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
      const id = localStorage.getItem("hostelId");

      const response = await axios.post(`${api}/new/register-hostel-images/${id}`, data, { headers });
      const responseData = response.data;
      localStorage.removeItem("hostelId");
      return responseData;      
    }catch(error){
      console.log(error)
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
    localStorage.setItem("hostelId", response.data.hostelId)
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

// getting hostels data
export const allMyHostels = createAsyncThunk('hostel/allMyHostels', async() => {
  try{
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`
    };
    const response = await axios.get(`${api}/display/myhostels`, { headers });
    return response.data.myHostels;
  }catch(error){
    throw error
  }
});

// updating hostel data
export const updateMyHostels = createAsyncThunk('hostel/updateMyHostels', async(data) =>{
  try{
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`
    };
    const id = localStorage.getItem("updatingHostelId");
    
    const response = await axios.post(`${api}/update/myhostels/${id}`, data,{ headers });
    localStorage.removeItem("updatingHostelId");
    return response.data.updatedHostel;
  }catch(error){
    throw error
  }
})

// getting hostel detail
export const specificHostelDetail = createAsyncThunk("hostel/specificHostelDetail", async(id)=> {
  try{
    const response = await axios.get(`${api}/display/detail/${id}`);
    return response.data;
  }catch(error){
    throw error
  }
});

// getting all hostels 
export const allHostels = createAsyncThunk("hostel/allHostels", async()=> {
  try{
  
    const response = await axios.get(`${api}/allhostels`);
    return response.data.allHostels;
  }catch(error){
    throw error
  }
});

// adding review
export const addHostelReview = createAsyncThunk("hostel/addHostelReview", async(data)=> {
  try{
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`
    };
    const id = data.hostelId;
    const response = await axios.post(`${api}/addreview/${id}`, data.reviews,{ headers });
    return response.data.hostelReviews;
  }catch(error){
    throw error
  }
});


const initialState = {
  hostel: null,
  hLoading: "idle",
  hDataLoading: "idle",
  gettingMyHostels : "idle",
  oneOwnerHostels : [],
  gettingAllHostels : "idle",
  allHostels : [],
  reviewAdding: "idle",
  specificHReviews : [],
  hostelDetailLoading : "idle",
  hostelDetail : null
}


export const registerHostelSlice = createSlice({
  name: "hostel",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerHostel.pending, (state, action) => {
        state.hDataLoading = "pending"
      })
      .addCase(registerHostel.fulfilled, (state, action) => {
        state.hDataLoading = "success"
      })
      .addCase(registerHostel.rejected, (state, action) => {
        state.hDataLoading = "idle"
      })
      .addCase(hostelImagesData.pending, (state, action) => {
        state.hLoading = "pending"
      })
      .addCase(hostelImagesData.fulfilled, (state, action) => {
        state.hLoading = "success"
      })
      .addCase(hostelImagesData.rejected, (state, action) => {
        state.hLoading = "idle"
        toast.error("Unable to upload Images");
      })
      .addCase(allMyHostels.pending, (state, action) => {
        state.gettingMyHostels = "pending"
      })
      .addCase(allMyHostels.fulfilled, (state, action) => {
        state.gettingMyHostels = "success"
        state.oneOwnerHostels = action.payload;
      })
      .addCase(allMyHostels.rejected, (state, action) => {
        state.gettingMyHostels = "idle"
      })
      .addCase(updateMyHostels.pending, (state, action) => {
        state.gettingMyHostels = "pending"
      })
      .addCase(updateMyHostels.fulfilled, (state, action) => {
        state.gettingMyHostels = "success"
        state.oneOwnerHostels = action.payload;
      })
      .addCase(updateMyHostels.rejected, (state, action) => {
        state.gettingMyHostels = "idle"
      })
      .addCase(allHostels.pending, (state, action) => {
        state.gettingAllHostels = "pending"
      })
      .addCase(allHostels.fulfilled, (state, action) => {
        state.gettingAllHostels = "success"
        state.allHostels = action.payload;
      })
      .addCase(allHostels.rejected, (state, action) => {
        state.gettingAllHostels = "idle"
      })
      .addCase(addHostelReview.pending, (state, action) => {
        state.reviewAdding = "pending"
      })
      .addCase(addHostelReview.fulfilled, (state, action) => {
        state.reviewAdding = "success"
        state.specificHReviews = action.payload;
      })
      .addCase(addHostelReview.rejected, (state, action) => {
        state.reviewAdding = "idle"
      })
      .addCase(specificHostelDetail.pending, (state, action) => {
        state.hostelDetailLoading = "pending"
      })
      .addCase(specificHostelDetail.fulfilled, (state, action) => {
        state.hostelDetailLoading = "success"
        state.hostelDetail = action.payload.hostelDetail;
        state.specificHReviews = action.payload.reviews
      })
      .addCase(specificHostelDetail.rejected, (state, action) => {
        state.hostelDetailLoading = "idle"
      })
  }
})

export const hLoading = (state) => state.hLoading;
export const hDataLoading = (state) => state.hDataLoading;
export const oneOwnerHostels = (state) => state.oneOwnerHostels;
export const allHostelsData = (state) => state.allHostels;
export const specificHReviews = (state) => state.specificHReviews;
export const hostelDetail = (state) => state.hostelDetail;


export default registerHostelSlice.reducer;