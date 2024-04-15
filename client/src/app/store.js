import { configureStore } from "@reduxjs/toolkit";
import hostelReducer from "../features/hostel/registerHostelSlice";
import userReducer from "../features/auth/userAuthSlice";

export const store = configureStore({
    reducer : {
       hostel : hostelReducer,
       user : userReducer
    }
})

export default store;