
interface authReducerType {
    count: number
}

interface chatReducerType {
    count: number
}

export type storeTypes = {
    auth : authReducerType,
    chat : chatReducerType
}