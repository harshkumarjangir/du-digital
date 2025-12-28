import { createSlice } from "@reduxjs/toolkit";

const BackendURL = import.meta.VITE_BACKEND_URL || 'http://localhost:3000'


const initialState = {

}

const contactSlice = createSlice({
    name: 'contact',
    initialState
})

export default contactSlice.reducer;
