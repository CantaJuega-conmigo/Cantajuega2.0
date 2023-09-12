import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Child } from "../types";
interface initialState {
  child: Child | null;
}
const initialState: initialState = {
  child: null,
};

const childSlice = createSlice({
  name: "Child",
  initialState,
  reducers: {
    setChild(state, action: PayloadAction<Child|null>) {
      console.log("guardo a user en el estado global", action);
      state.child = action.payload;
    },
  },
});
export const { setChild } = childSlice.actions;
export default childSlice.reducer;
