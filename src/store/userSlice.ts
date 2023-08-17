import { createSlice ,PayloadAction} from "@reduxjs/toolkit";
import { User } from "../types";
interface initialState{
  user:User,
}
const initialState :initialState={
 user: {
  id: "",
  email: "",
  firstName: "",
  lastName: "",
}
}

const userSlice = createSlice({
  name: "ActualUser",
  initialState,
  reducers: {
    setUser(state, action:PayloadAction<any> ) {
      console.log('me ejecuto',action)
      state.user = action.payload;
    },
  },
});
export const { setUser } = userSlice.actions;
export default userSlice.reducer;