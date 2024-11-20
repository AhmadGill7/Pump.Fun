import { configureStore } from '@reduxjs/toolkit'
import UserSlice from '@/Slices/usersSlice'
import TokenSlice from '@/Slices/tokenSlice'

const PumpStore = configureStore({
    reducer: {
        user: UserSlice,
        token: TokenSlice,
    }
});

export default PumpStore;
