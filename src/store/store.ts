import { configureStore } from "@reduxjs/toolkit";
import reducerSlice from './slice'
import { CantajuegaService } from "./apis/CantajuegaApi";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import userReducer from "./userSlice";
export const rootReducer = {
  reducerSlice,
  userReducer,
};

export const store= configureStore({
    reducer:{
      ...rootReducer,
      [CantajuegaService.reducerPath]:CantajuegaService.reducer
    },
    middleware:(getDefaultMiddleware)=>
       getDefaultMiddleware().concat([CantajuegaService.middleware])
})

setupListeners(store.dispatch)
export type RootState=ReturnType<typeof store.getState>
export type AppDispatch=typeof store.dispatch
