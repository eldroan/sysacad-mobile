import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { ApplicationState } from "./types";
import { authSlice } from "./auth/reducer";
import { examenesSlice } from "./examenes/reducer";

const reducers = combineReducers<ApplicationState>({
  auth: authSlice,
  examenes: examenesSlice,
});

export default createStore(reducers, applyMiddleware(thunk));
