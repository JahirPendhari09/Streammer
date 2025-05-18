import { ActionTypes, initialStateTypes } from "./types"

const initialState: initialStateTypes = {
    size: 20
}

export const reducer = (state= initialState, action: ActionTypes) => {
    switch(action.type) {
        default: {
            return state
        }
    }
}