import { SEND_SELECT, SEND_LAST_SELECTED, ADD_MATCH } from "./types";

export const sendSelect = (id, select) => {
  return { type: SEND_SELECT, payload: { id: id, select: select } };
};

export const sendLastSelected = (id, icon) => {
  return { type: SEND_LAST_SELECTED, payload: { id: id, icon: icon } };
};

export const addMatch = (obj1, obj2) => {
  return { type: ADD_MATCH, payload: { icon1: obj1, icon2: obj2 } };
};
