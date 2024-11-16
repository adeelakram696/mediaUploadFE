import { createSlice } from '@reduxjs/toolkit';
import { mediaList, mediaUpload } from './thunks';

const mediaSlice = createSlice({
  name: 'media',
  initialState: { mediaList: [], loading: false},
  reducers: {
    updateMediaOrder(state, action) {
      state.mediaList = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(mediaList.pending, (state) => {
        state.loading = true;
      })
      .addCase(mediaList.fulfilled, (state, action) => {
        state.mediaList = action.payload;
        state.loading = false;
      })
      .addCase(mediaList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder
      .addCase(mediaUpload.pending, (state) => {
        state.loading = true;
      })
      .addCase(mediaUpload.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(mediaUpload.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { updateMediaOrder } = mediaSlice.actions;
export default mediaSlice.reducer;
