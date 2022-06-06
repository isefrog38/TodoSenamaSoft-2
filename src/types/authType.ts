export type ResponseDataLoginOrAuthMe = {
    _id: null | string,
    email: null | string,
    name: null | string,
    rememberMe: null | boolean,
}

export type initialStateAuthorizationType = ResponseDataLoginOrAuthMe & { isAuth: boolean };