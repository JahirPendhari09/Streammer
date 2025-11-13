import { chatStateTypes, ActionTypes } from "../types"

const initialState: chatStateTypes = {
    
}


export const reducer = (state = initialState, { type, payload }: ActionTypes): chatStateTypes => {
    switch(type) {
        
        default: {
            return state
        }
    }
}