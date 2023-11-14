import { configureStore } from '@reduxjs/toolkit';
import reducerSlice from './slice';
import { CantajuegaService } from './apis/CantajuegaApi';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import userReducer from './userSlice';
import childReducer from './childSlice';
import progressReducer from './child_progress_slice';
import uiReducer from './uiSlice';
export const rootReducer = {
  reducerSlice,
  userReducer,
  childReducer,
  progressReducer,
  uiReducer,
};

export const store = configureStore({
  reducer: {
    ...rootReducer,
    [CantajuegaService.reducerPath]: CantajuegaService.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([CantajuegaService.middleware]),
});

setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
