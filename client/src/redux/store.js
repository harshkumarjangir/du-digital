import { configureStore } from "@reduxjs/toolkit";

// Temporary root reducer until feature slices are added.
// It simply returns the existing state for all actions.
const rootReducer = (state = {}, action) => {
  return state;
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;