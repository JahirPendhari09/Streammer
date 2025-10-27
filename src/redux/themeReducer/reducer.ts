import { SET_THEME } from "../actionTypes"
import { ActionTypes, themeStateTypes } from "../types"

const initialState: themeStateTypes = {
    size: 22,
    theme: "dark"
}

export const reducer = (state= initialState, action: ActionTypes): themeStateTypes  => {
    switch(action.type) {
        case SET_THEME: {
            return {
                ...state,
                theme: action.payload
            }
        }
        
        default: {
            return state
        }
    }
}