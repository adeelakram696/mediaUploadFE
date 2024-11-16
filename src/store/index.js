import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../modules/auth/ducks/slice';
import mediaReducer from '../modules/mediaFiles/ducks/slice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    media: mediaReducer,
  },
});

export default store;
