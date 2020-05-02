import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { ApplicationState } from "./types";
import { auth } from "./auth/reducer";

const reducers = combineReducers<ApplicationState>({
  auth,
});

export default createStore(reducers, applyMiddleware(thunk));
