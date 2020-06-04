import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../reducers";

import localStorageMiddleware  from "./middlewares/localStorage";

export default createStore(
    rootReducer,
    compose(applyMiddleware(localStorageMiddleware), window.devToolsExtension ? window.devToolsExtension() : f => f)
);