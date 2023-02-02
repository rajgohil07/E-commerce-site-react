import { applyMiddleware, createStore } from "redux";
import Thunk from "redux-thunk";
import { parentReducer } from "./ParentReducer";

export const store = createStore(parentReducer, applyMiddleware(Thunk));
