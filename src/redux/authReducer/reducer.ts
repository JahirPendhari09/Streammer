import { authStateTypes, ActionTypes } from "../types"

const initialState: authStateTypes = {
    count : 0,
    username: 'abc',
    token: '',
}

export const reducer = (state = initialState, { type, payload }: ActionTypes): authStateTypes => {
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