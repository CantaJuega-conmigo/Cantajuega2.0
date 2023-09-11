import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Child } from "../types";
interface initialState {
  child: Child | null;
}
const initialState: initialState = {
  child: null,
};

const userSlice = createSlice({
  name: "Child",
  initialState,
  reducers: {
    setChild(state, action: PayloadAction<Child|null>) {
      console.log("guardo a user en el estado global", action);
      state.child = action.payload;
    },
  },
});
export const { setChild } = userSlice.actions;
export default userSlice.reducer;
