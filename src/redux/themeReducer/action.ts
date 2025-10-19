import { Dispatch } from "redux";
import { SET_THEME } from "../actionTypes"

export const updateTheme = (data: any) => (dispatch: Dispatch) => {
  dispatch({ type: SET_THEME, payload: data });
};
