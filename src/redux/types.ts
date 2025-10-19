
interface authReducerType {
    count: number
}

interface chatReducerType {
    count: number
}

interface themeReducerType {
    count: number
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
    count: number,
    username: string,
    token: string
}

export type chatStateTypes = {
    count: number,
}

export type themeStateTypes = {
    size: number,
    theme: string
}
