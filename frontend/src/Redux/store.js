import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "./profile.tsx"

export default configureStore({
    reducer: {
        profile: profileReducer
    }
})