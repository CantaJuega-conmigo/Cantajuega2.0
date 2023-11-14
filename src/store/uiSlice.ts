import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface initialState {
  dashboardNavHeight: number;
}
const initialState: initialState = {
  dashboardNavHeight: 0,
};

const uiSlice = createSlice({
  name: 'Ui',
  initialState,
  reducers: {
    heigthNavDashboard(state, action: PayloadAction<number>) {
      state.dashboardNavHeight = action.payload;
    },
  },
});
export const { heigthNavDashboard } = uiSlice.actions;
export default uiSlice.reducer;
