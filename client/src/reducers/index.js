import _ from "lodash";
import { combineReducers } from "redux";
import {
  SEND_LAST_SELECTED,
  SEND_SELECT,
  GET_SELECTS,
  GET_SELECT,
  ADD_MATCH
} from "../actions/types";

const gameReducer = (state = { nSelected: 0 }, action) => {
  switch (action.type) {
    case GET_SELECTS:
      return { ...state, ..._.mapKeys(action.payload, "id") };

    case SEND_SELECT:
      return {
        ...state,
        [action.payload.id]: action.payload.select,
        nSelected: state.nSelected + action.payload.select * 2 - 1
      };

    default:
      return state;
  }
};
const lastSelected = (state = { last: null, prev: null }, action) => {
  switch (action.type) {
    case SEND_LAST_SELECTED:
      return { last: action.payload, prev: state.last };
    default:
      return state;
  }
};

const matchReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_MATCH:
      return { ...state, [action.payload.icon1.id]: action.payload };
    default:
      return state;
  }
};
const reducer = combineReducers({
  selected: gameReducer,
  lastSelected: lastSelected,
  matches: matchReducer
});
export default reducer;
