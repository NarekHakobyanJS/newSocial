import { authAPI } from "../api/api"

const SET_USER_DATA = 'SET_USER_DATA'

const initialState = {
    userId : null,
    email : null,
    login : null,
    isAuth : false
}

const authReducer =  (state = initialState, action : any) => {
    switch(action.type) {
        case SET_USER_DATA : 
            return {
                ...state,
                ...action.data,
                isAuth : true
            }
        default :
        return state
    }
}

export const setAuthUserData = (userId : number, email : string, login : string) => ({type : SET_USER_DATA, data : {userId, email, login}})

export const getAuthUserData = () => {
    return (dispatch : any) => {
        authAPI.me()
        .then((response) => {
            const { login, email, userId } = response.data.data
            if (response.data.resultCode === 0) {
                dispatch(setAuthUserData(userId, email, login))
            }
        })
    }
}
export default authReducer