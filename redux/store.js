import { configureStore } from '@reduxjs/toolkit'
import sideReducer from "./slices/sideSlice";

const store = configureStore({
    reducer: {
        side: sideReducer
    },
})

export default store;
