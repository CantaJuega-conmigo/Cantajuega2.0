import { createSlice } from "@reduxjs/toolkit";


const initialState={///estado global
    data:[]
}

export const Slice=createSlice({
    name:'valores',///nombre de general 
    initialState,
    reducers:{///aqui van las actions que modifican el estado global
    }
})

export default Slice.reducer
