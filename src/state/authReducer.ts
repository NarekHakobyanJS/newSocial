import { authAPI, securityAPI } from "../api/api"

const SET_USER_DATA = 'auth/SET_USER_DATA'
const GET_CAPTCHA_URL = 'auth/GET_CAPTCHA_URL'

const initialState = {
    userId: null as null | number,
    email: null as null | string,
    login: null as null | string,
    isAuth: false as boolean,
    captchaUrl: null as null | string
}
export type InitialStateType = typeof initialState

const authReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload,
            }
        case GET_CAPTCHA_URL: {
            return {
                ...state,
                captchaUrl: action.payload
            }
        }
        default:
            return state
    }
}
type SetAuthUserDataActionPayloadType = {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean | undefined
}

type SetAuthUserDataActionType = {
    type: typeof SET_USER_DATA,
    payload: SetAuthUserDataActionPayloadType
}

type GetCaptchaUrlSuccessActionType = {
    type: typeof GET_CAPTCHA_URL,
    payload: string
}

export const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth?: boolean): SetAuthUserDataActionType => ({ type: SET_USER_DATA, payload: { userId, email, login, isAuth } })
export const getCaptchaUrlSuccess = (url: string): GetCaptchaUrlSuccessActionType => ({ type: GET_CAPTCHA_URL, payload: url })


export const getAuthUserData = () => {
    return async (dispatch: any) => {
        const response = await authAPI.me()
        if (response.data.resultCode === 0) {
            const { login, email, id } = response.data.data
            dispatch(setAuthUserData(id, email, login, true))
        }

    }
}

export const login = (email: string, password: string, rememberMe: boolean) => {
    return async (dispatch: any) => {
        const response = await authAPI.login(email, password, rememberMe)

        // if (response.data.resultCode === 0) {
        dispatch(getAuthUserData())
        // }
        // else if(response.data.resultCode === 10) {
        //     dispatch(getCaptchaUrl())
        // }
    }
}

export const getCaptchaUrl = () => {
    return async (dispatch: any) => {
        const response = await securityAPI.getCaptchaUrl()
        const captchaUrl = response.data.url
        dispatch(getCaptchaUrlSuccess(captchaUrl))

    }
}

export const logout = () => {
    return async (dispatch: any) => {
        const response = await authAPI.logout()
        if (response.data.resultCode === 0) {
            dispatch(setAuthUserData(null, null, null, false))
        }
    }
}

export default authReducer