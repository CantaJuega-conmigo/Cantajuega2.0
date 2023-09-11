import { createSlice ,PayloadAction} from "@reduxjs/toolkit";
import { User } from "../types";
interface initialState{
  user:User|null,
}
const initialState :initialState={
 user:null
}

const userSlice = createSlice({
  name: "ActualUser",
  initialState,
  reducers: {
    setUser(state, action:PayloadAction<any> ) {
      console.log('guardo a user en el estado global',action)
      state.user = action.payload;
    },
  },
});
export const { setUser } = userSlice.actions;
export default userSlice.reducer;