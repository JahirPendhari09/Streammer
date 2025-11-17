import { SET_ONLINE_USERS } from "../actionTypes"
import { chatStateTypes, ActionTypes } from "../types"

const initialState: chatStateTypes = {
    onlineUsers: []
}


export const reducer = (state = initialState, { type, payload }: ActionTypes): chatStateTypes => {
    switch(type) {
        case SET_ONLINE_USERS: {
            return {...state, onlineUsers: payload}
        }
        default: {
            return state
        }
    }
}