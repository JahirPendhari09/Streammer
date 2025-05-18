
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