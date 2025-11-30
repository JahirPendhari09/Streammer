import { SET_GROUP_CHAT, SET_ONLOAD, SET_NOTIFICATIONS, SET_ONLINE_USERS, SET_JOINED_MEMBERS } from "../actionTypes"
import { chatStateTypes, ActionTypes } from "../types"

const initialState: chatStateTypes = {
    onlineUsers: [],
    chat: [],
    group: 'test',
    isLoad: false,
    notifications: [],
    joinedPeoples: []
}


export const reducer = (state = initialState, { type, payload }: ActionTypes): chatStateTypes => {
    switch(type) {
        case SET_ONLINE_USERS: {
            return {...state, onlineUsers: payload}
        }
        case SET_ONLOAD: {
            return {...state, chat: payload, isLoad: true}
        }
        case SET_GROUP_CHAT: {
            return {...state, chat: payload}
        }
        case SET_NOTIFICATIONS: {
            return {...state, notifications: payload}
        }
        case SET_JOINED_MEMBERS: {
            return {...state, joinedPeoples: payload}
        }
        default: {
            return state
        }
    }
}