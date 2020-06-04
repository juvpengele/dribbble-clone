import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../reducers";

export default createStore(
    rootReducer,
    compose(applyMiddleware(), window.devToolsExtension ? window.devToolsExtension() : f => f)
);