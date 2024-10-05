import { combineReducers} from '@reduxjs/toolkit'
import counterReducer from '../../src/redux/features/counterSlice'
import userReducer from "../../src/redux/features/counterSlice"
export const rootReducer =combineReducers ({
        counter: counterReducer,
        user : userReducer
});