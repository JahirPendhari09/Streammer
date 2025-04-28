import { ActionTypes, initialStateTypes } from "./types"


const initialState: initialStateTypes = {
    count : 0
}


export const reducer = (state = initialState, { type, payload } :ActionTypes) => {
    switch(type) {
        case "INCREAMENT" : {
            return {...state, count: state.count + 1}
        }
        case "DECREAMENT" : {
            return {...state, count: state.count - 1}
        }
        default: {
            return state
        }
    }
}