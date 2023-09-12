import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {  progress } from "../types";
interface initialState  {
  progress:progress|null,
  actualprogress:keyof progress|null

}
const initialState: initialState = {
  progress:null,
  actualprogress:null
};

const child_progress_slice = createSlice({
  name: "Child",
  initialState,
  reducers: {
    setProgress(state, action: PayloadAction<progress|null>) {
      console.log("guardo a user en el estado global progress", action);
      state.progress = action.payload;
    },
    setActualProgress(state,action:PayloadAction<keyof progress|null>){
      state.actualprogress=action.payload
    }
  },
});
export const { setProgress ,setActualProgress} = child_progress_slice.actions;
export default child_progress_slice.reducer;
