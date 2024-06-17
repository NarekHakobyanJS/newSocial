import { socialAPI } from "../api/api";

const ADD_POST = "ADD_POST";
const UPDATE_NEW_POST_TEXT = 'UPDATE_NEW_POST_TEXT';
const SET_USER_PROFILE = 'SET_USER_PROFILE'
export type PostType = {
    id: number,
    message: string | undefined,
    likesCount: number
}

export type PostDataType = Array<PostType>

export type ProfileAPIType = {
    aboutMe : string,
    contacts : {
        facebook :  string | null,
        website : string | null,
        vk :  string | null,
        twitter : string | null,
        instagram : string | null,
        youtube : string | null,
        github : string | null,
        mainLink : string | null,
    },
    lookingForAJob : boolean,
    lookingForAJobDescription : string,
    fullName : string,
    userId : number,
    photos : {
        small : string |  undefined,
        large : string |  undefined
    }
}
export type ProfilePageStateType = {
    newPostText: any
    posts: PostDataType
    profile : ProfileAPIType | null | string | undefined
}

const initialState : ProfilePageStateType= {
    newPostText: '',
    posts: [
        { id: 1, message: 'hi muder fucker', likesCount: 1 },
        { id: 2, message: 'hi muder fucker', likesCount: 1 },
    ],
    profile : null
}

type AddPostActioCreatorType = {
    type: string,
    payload?: string
}

type UpdateNewPostTextActionCreatorType = {
    type: string,
    payload?: string
}

type ProfileAPITypeActionCreator = {
    type: string,
    payload? : ProfileAPIType | string
}

type ActionProfileType = AddPostActioCreatorType | UpdateNewPostTextActionCreatorType | ProfileAPITypeActionCreator

const profileReducer = (state: ProfilePageStateType = initialState, action: ActionProfileType): ProfilePageStateType => {
    switch (action.type) {

        case ADD_POST: {
            let newPost = {
                id: 5,
                message: state.newPostText,
                likesCount: 0
            }
            return {
                ...state,
                posts : [...state.posts, newPost],
                newPostText : ''
            }

        }
        case UPDATE_NEW_POST_TEXT: {
            state.newPostText = action.payload
            return {
                ...state,
                newPostText : action.payload
            }
        }
        case SET_USER_PROFILE :
            return {
                ...state,
                profile : action.payload
            }
        default:
            return state
    }
}


export const addPostAC = (): AddPostActioCreatorType => ({ type: ADD_POST })
export const updateNewPostTextAC = (payload: string): UpdateNewPostTextActionCreatorType => ({ type: UPDATE_NEW_POST_TEXT, payload})
export const setUserProfile = (profile : ProfileAPIType ) : ProfileAPITypeActionCreator  => ({type : SET_USER_PROFILE, payload : profile})

export const getUserProfile = (userId : number | string | undefined) => {
    return (dispatch : any) => {
        socialAPI.getProfile(userId)
            .then((response: any) => {
                dispatch(setUserProfile(response.data))
            })
    }
}
export default profileReducer