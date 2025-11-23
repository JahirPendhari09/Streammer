
interface authReducerType {
}

interface chatReducerType {
    
}

interface themeReducerType {
}

export type storeTypes = {
    auth: authReducerType,
    chat: chatReducerType,
    theme: themeReducerType,
}


export type ActionTypes = {
    type: string,
    payload: any,
}


export type authStateTypes = {
    _id: string,
    is_authenticated? : boolean,
    firstName: string,
    lastName: string,
    email: string,
    token: string
}

export type chatStateTypes = {
}

export type themeStateTypes = {
    size: number,
    theme: string
}
