import { configureStore } from "@reduxjs/toolkit";
import investorReducer from "./slices/investorSlice";
import contactReducer from "./slices/contactSlice";
import partnerReducer from "./slices/partnerSlice";
import teamReducer from "./slices/teamSlice";
import galleryReducer from "./slices/gallerySlice";
import videoReducer from "./slices/videoSlice";
import officeReducer from "./slices/officeSlice";
import BlogReducer from "./slices/BlogsSlice";
import careersReducer from "./slices/careersSlice";

const store = configureStore({
  reducer: {
    investor: investorReducer,
    contact: contactReducer,
    partner: partnerReducer,
    team: teamReducer,
    gallery: galleryReducer,
    video: videoReducer,
    office: officeReducer,
    blog: BlogReducer,
    careers: careersReducer,
  },
});

export default store;