export type ResponseDataLoginOrAuthMe = {
    id: null | string,
    email: null | string,
    isActivated: boolean | null
}

export type ResponseRegisterType = {
    "accessToken": string,
    "refreshToken": string,
    "user": ResponseDataLoginOrAuthMe
}

export type initialStateAuthorizationType = ResponseDataLoginOrAuthMe & { isAuth: boolean };