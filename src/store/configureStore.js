import { createStore, combineReducers, applyMiddleware } from "redux";
import { reducer as formReducer } from 'redux-form'
import thunk from "redux-thunk";
import logger from "redux-logger";

import todoReducer from "./reducers/todoReducer";
import bucketReducer from "./reducers/bucketReducer";


export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      todo: todoReducer,
      bucket: bucketReducer,
      form: formReducer
    }),
    applyMiddleware(thunk, logger)
  );

  return store;
};
