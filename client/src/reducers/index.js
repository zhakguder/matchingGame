import _ from "lodash";
import { combineReducers } from "redux";
import {
  SEND_LAST_SELECTED,
  SEND_SELECT,
  GET_SELECTS,
  ADD_MATCH,
  SEND_SCORE,
  RESET
} from "../actions/types";

const INITIAL_STATES = {
  game: { nSelected: 0, nClicked: 0, score: 0 },
  last: { last: null, prev: null },
  match: {}
};

const gameReducer = (state = INITIAL_STATES.game, action) => {
  switch (action.type) {
    case RESET:
      return INITIAL_STATES.game;
    case GET_SELECTS:
      return { ...state, ..._.mapKeys(action.payload, "id") };

    case SEND_SELECT:
      return {
        ...state,
        [action.payload.id]: action.payload.select,
        nSelected: state.nSelected + action.payload.select * 2 - 1,
        nClicked: state.nClicked + action.payload.clickValue
      };
    case SEND_SCORE:
      return {
        ...state,
        score: _.clamp(state.score + action.payload.increment, 0, 3)
      };
    default:
      return state;
  }
};
const lastSelected = (state = INITIAL_STATES.last, action) => {
  switch (action.type) {
    case RESET:
      return INITIAL_STATES.last;
    case SEND_LAST_SELECTED:
      return { last: action.payload, prev: state.last };
    default:
      return state;
  }
};

const matchReducer = (state = INITIAL_STATES.match, action) => {
  switch (action.type) {
    case RESET:
      return INITIAL_STATES.match;
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
