import { authAPI } from "../api/api"

const SET_USER_DATA = 'SET_USER_DATA'

const initialState = {
    userId : null,
    email : null,
    login : null,
    isAuth : false,
}

const authReducer =  (state = initialState, action : any) => {
    switch(action.type) {
        case SET_USER_DATA : 
            return {
                ...state,
                ...action.payload,
            }
        
        default :
        return state
    }
}

export const setAuthUserData = (userId : number | null, email : string | null, login : string | null, isAuth? : boolean) => ({type : SET_USER_DATA, payload : {userId, email, login, isAuth}})

export const getAuthUserData = () => {
    return (dispatch : any) => {
        authAPI.me()
        .then((response) => {
            if (response.data.resultCode === 0) {
                const { login, email, id } = response.data.data
                dispatch(setAuthUserData(id, email, login, true))
            }
        })
    }
}

export const login = (email : string, password : string, rememberMe : boolean) => {
    return (dispatch : any) => {
        authAPI.login(email, password, rememberMe)
        .then((response) => {
            if (response.data.resultCode === 0) {
               dispatch(getAuthUserData())
            }
        })
    }
}


export const logout = () => {
    return (dispatch : any) => {
        authAPI.logout()
        .then((response) => {
            if (response.data.resultCode === 0) {
               dispatch(setAuthUserData(null, null, null, false))
            }
        })
    }
}

export default authReducer