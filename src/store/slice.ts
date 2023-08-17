import { createSlice } from "@reduxjs/toolkit";


const initialState={///estado global
    User:[]
}

export const Slice=createSlice({
    name:'valores',///nombre de general 
    initialState,
    reducers:{///aqui van las actions que modifican el estado global
      setUser:(state,action)=>{
        console.log(action);
        state.User=action.payload
      }
    }
})

export default Slice.reducer
