import { configureStore } from "@reduxjs/toolkit";
import investorReducer from "./slices/investorSlice";
import contactReducer from "./slices/contactSlice";
import partnerReducer from "./slices/partnerSlice";
import teamReducer from "./slices/teamSlice";
import galleryReducer from "./slices/gallerySlice";

const store = configureStore({
  reducer: {
    investor: investorReducer,
    contact: contactReducer,
    partner: partnerReducer,
    team: teamReducer,
    gallery: galleryReducer
  },
});

export default store;