import { LOGIN_USER_SUCCESS, LOGOUT_USER_SUCCESS,  } from "../actionTypes"
import { authStateTypes, ActionTypes } from "../types"

const initialState: authStateTypes = {
    is_authenticated: false,
    _id: '',
    firstName: '',
    lastName: '',
    email: '',
    token: '',
}

export const reducer = (state = initialState, { type, payload }: ActionTypes): authStateTypes => {
    switch(type) {
        case LOGIN_USER_SUCCESS : {
            return {...state, ...payload, is_authenticated: true}
        }
        case LOGOUT_USER_SUCCESS : {
            return initialState
        }
        default: {
            return state
        }
    }
}