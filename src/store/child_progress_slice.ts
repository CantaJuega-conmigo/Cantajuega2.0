import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {  Final_Video, First_Video, Other_Video, progress, videoprogresses } from "../types";
interface initialState  {
  progress:progress|null,
  actualprogress:First_Video|Other_Video|Final_Video|null,
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
    setActualProgress(state,action:PayloadAction<First_Video|Final_Video|Other_Video|null>){
      state.actualprogress=action.payload
    }
  },
});
export const { setProgress ,setActualProgress} = child_progress_slice.actions;
export default child_progress_slice.reducer;
