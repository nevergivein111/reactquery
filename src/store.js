import {
  configureStore,
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

// Example async function to fetch data
export const fetchData = createAsyncThunk("data/fetchData", async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");
  const data = await response.json();
  return data;
});

const dataSlice = createSlice({
  name: "data",
  initialState: { data: null, status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

const store = configureStore({
  reducer: {
    data: dataSlice.reducer,
  },
});

export default store;
