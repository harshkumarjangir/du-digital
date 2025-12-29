import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const BackendURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000'

// Async thunk to submit partner form
export const submitPartnerForm = createAsyncThunk(
    'partner/submitForm',
    async (formData, { rejectWithValue }) => {
        try {
            const response = await fetch(`${BackendURL}/api/partner/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || 'Failed to submit partner form');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message || 'An error occurred while submitting the form');
        }
    }
);

const initialState = {
    loading: false,
    error: null,
    success: false,
    submittedData: null
}

const partnerSlice = createSlice({
    name: 'partner',
    initialState,
    reducers: {
        clearPartnerState: (state) => {
            state.error = null;
            state.success = false;
            state.submittedData = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(submitPartnerForm.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(submitPartnerForm.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.submittedData = action.payload;
                state.error = null;
            })
            .addCase(submitPartnerForm.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.success = false;
            });
    }
})

export const { clearPartnerState } = partnerSlice.actions;
export default partnerSlice.reducer;

