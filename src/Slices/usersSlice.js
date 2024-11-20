import { createSlice } from "@reduxjs/toolkit";

// Define the slice first and then export it
const UserSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
    changingPage:0
  },
  reducers: {
    addUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser(state) {
      state.user = {};
    },
    newPage: (state, action) => {
      console.log(action.payload)
      state.changingPage = action.payload;
    },
  },
});

// Export the reducer
export default UserSlice.reducer;

export const { addUser, clearUser,newPage } = UserSlice.actions;
