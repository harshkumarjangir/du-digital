import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const BackendURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

// Async thunk to fetch news
export const fetchNews = createAsyncThunk(
    'news/fetchNews',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch(`${BackendURL}/api/news/`);

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || 'Failed to fetch news');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message || 'An error occurred while fetching news');
        }
    }
);

const initialState = {
    news: [],
    loading: false,
    error: null,
    success: false
};

const newsSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {
        clearNewsState: (state) => {
            state.error = null;
            state.success = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchNews.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(fetchNews.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.news = action.payload;
                state.error = null;
            })
            .addCase(fetchNews.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.success = false;
            });
    }
});

export const { clearNewsState } = newsSlice.actions;
export default newsSlice.reducer;
