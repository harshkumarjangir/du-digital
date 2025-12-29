import { configureStore } from "@reduxjs/toolkit";
import investorReducer from "./slices/investorSlice";
import contactReducer from "./slices/contactSlice";
import partnerReducer from "./slices/partnerSlice";

const store = configureStore({
  reducer: {
    investor: investorReducer,
    contact: contactReducer,
    partner: partnerReducer
  },
});

export default store;