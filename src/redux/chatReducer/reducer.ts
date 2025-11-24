import { SET_GROUP_CHAT, SET_GROUP_CHAT_ONLOAD, SET_ONLINE_USERS } from "../actionTypes"
import { chatStateTypes, ActionTypes } from "../types"

const initialState: chatStateTypes = {
    onlineUsers: [],
    chat: [],
    group: 'test',
    isGroupChatLoad: false,
}


export const reducer = (state = initialState, { type, payload }: ActionTypes): chatStateTypes => {
    switch(type) {
        case SET_ONLINE_USERS: {
            return {...state, onlineUsers: payload}
        }
        case SET_GROUP_CHAT_ONLOAD: {
            return {...state, chat: payload, isGroupChatLoad: true}
        }
        case SET_GROUP_CHAT: {
            return {...state, chat: payload}
        }
        default: {
            return state
        }
    }
}