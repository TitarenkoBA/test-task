import initialState from "../initialState"
import {
  CHANGE_THEME
} from "../constants"

export default function themeReducer(state = initialState.theme, action) {
  switch (action.type) {
    case CHANGE_THEME:
      return Object.assign({}, state, action.data);
    default:
      return state;
  }
}