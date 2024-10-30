import { createSlice } from "@reduxjs/toolkit";

// Define the slice first and then export it
const UserSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
  },
  reducers: {
    addUser: (state, action) => {
      console.log("payload:", action?.payload);
      state.user = action.payload;
    },
    clearUser(state) {
      state.user = "";
      // clear any other relevant user data
    },
  },
});

// Export the reducer
export default UserSlice.reducer;

export const { addUser, clearUser } = UserSlice.actions;
