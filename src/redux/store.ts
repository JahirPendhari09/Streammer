import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { thunk } from "redux-thunk";
import { reducer as authReducer } from "./authReducer/reducer";
import { reducer as chatReducer } from "./chatReducer/reducer";

const allReducers = combineReducers({
    auth: authReducer,
    chat: chatReducer
})


export const store = legacy_createStore( allReducers ,applyMiddleware(thunk))