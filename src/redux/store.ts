import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import thunk, { ThunkMiddleware } from "redux-thunk"; 
import { reducer as authReducer } from "./authReducer/reducer";
import { reducer as chatReducer } from "./chatReducer/reducer";
import { reducer as themeReducer } from "./themeReducer/reducer";

// Combine reducers
const allReducers = combineReducers({
  auth: authReducer,
  chat: chatReducer,
  theme: themeReducer,
});

// Define RootState (type of all reducers combined)
export type RootState = ReturnType<typeof allReducers>;

// Create store with proper thunk typing
export const store = legacy_createStore(
  allReducers,
  applyMiddleware(thunk as ThunkMiddleware<RootState, any>)  
);

// Export dispatch type so React knows dispatch supports thunks
export type AppDispatch = typeof store.dispatch;
