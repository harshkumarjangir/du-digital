import { configureStore } from "@reduxjs/toolkit";
import investorReducer from "./slices/investorSlice";
import contactReducer from "./slices/contactSlice";
import partnerReducer from "./slices/partnerSlice";
import teamReducer from "./slices/teamSlice";

const store = configureStore({
  reducer: {
    investor: investorReducer,
    contact: contactReducer,
    partner: partnerReducer,
    team: teamReducer
  },
});

export default store;