import { combineReducers } from "redux";
import appState from "./appState/reducer";
import user from "./user/reducer";
import post from "./post/reducer";
import request from "./request/reducer";

const reducer = combineReducers({
  appState,
  user,
  post,
  request,
  // etc.
});

export default reducer;
