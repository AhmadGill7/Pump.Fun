import { configureStore } from '@reduxjs/toolkit'
import UserSlice from '@/store/usersSlice'

// Define the store first, then export it
const PumpStore = configureStore({
    reducer: {
        user: UserSlice,
    }
});

export default PumpStore;
