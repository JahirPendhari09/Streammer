import { chatStateTypes, ActionTypes } from "../types"

const initialState: chatStateTypes = {
    count : 0
}


export const reducer = (state = initialState, { type, payload }: ActionTypes): chatStateTypes => {
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