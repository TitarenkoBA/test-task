import { createStore, combineReducers, applyMiddleware } from "redux";
import loginReducer from "./reducers/loginReducer";
import themeReducer from "./reducers/themeReducer";
import contactReducer from "./reducers/contactReducer";
import thunk from "redux-thunk";
import axios from "axios";

const reducers = combineReducers({
  login: loginReducer,
  theme: themeReducer,
  contacts: contactReducer,
});

const api = axios.create({
  baseURL: "http://localhost:3001/",
});

const store = createStore(
  reducers,
  applyMiddleware(
    thunk.withExtraArgument({
      api,
    })
  )
);

export default store;
