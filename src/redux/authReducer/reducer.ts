import { ActionTypes, initialStateTypes } from "./types"

const initialState: initialStateTypes = {
    count : 0,
    username: 'abc',
}

export const reducer = (state = initialState, { type, payload } :ActionTypes) => {
    switch(type) {
        case "INCREAMENT" : {
            return {...state, count: state.count + 1}
        }
        case "DECREAMENT" : {
            return {...state, count: state.count - 1}
        }
        case "SET_USER" : {
            return {...state, username: payload.username}
        }
        default: {
            return state
        }
    }
}