import {
  SEND_SELECT,
  SEND_LAST_SELECTED,
  ADD_MATCH,
  SEND_SCORE,
  RESET
} from "./types";

export const sendSelect = (id, select, clickValue) => {
  return {
    type: SEND_SELECT,
    payload: { id: id, select: select, clickValue: clickValue }
  };
};

export const sendLastSelected = (id, icon) => {
  return { type: SEND_LAST_SELECTED, payload: { id: id, icon: icon } };
};

export const addMatch = (obj1, obj2) => {
  return { type: ADD_MATCH, payload: { icon1: obj1, icon2: obj2 } };
};

export const sendScore = scoreInc => {
  return { type: SEND_SCORE, payload: { increment: scoreInc } };
};

export const reset = () => {
  return { type: RESET };
};
