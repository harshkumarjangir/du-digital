import { configureStore } from "@reduxjs/toolkit";
import investorReducer from "./slices/investorSlice";
import contactReducer from "./slices/contactSlice";

const store = configureStore({
  reducer: {
    investor: investorReducer,
    contact: contactReducer
  },
});

export default store;