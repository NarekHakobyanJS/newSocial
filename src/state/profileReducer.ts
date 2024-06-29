import { profileAPI, socialAPI } from "../api/api";
const ADD_POST = "profile/ADD_POST";
const SET_USER_PROFILE = 'profile/SET_USER_PROFILE'
const SET_STATUS = "profile/SET_STATUS"

export type PostType = {
    id: number,
    message: string | undefined,
    likesCount: number
}

export type PostDataType = Array<PostType>

export type ProfileAPIType = {
    aboutMe: string,
    contacts: {
        facebook: string | null,
        website: string | null,
        vk: string | null,
        twitter: string | null,
        instagram: string | null,
        youtube: string | null,
        github: string | null,
        mainLink: string | null,
    },
    lookingForAJob: boolean,
    lookingForAJobDescription: string,
    fullName: string,
    userId: number,
    photos: {
        small: string | undefined,
        large: string | undefined
    }
}
export type ProfilePageStateType = {
    newPostText: any
    posts: PostDataType
    profile: ProfileAPIType | null | string | undefined,
    status: string | undefined
}

const initialState: ProfilePageStateType = {
    newPostText: '',
    posts: [
        { id: 1, message: 'hi muder fucker', likesCount: 1 },
        { id: 2, message: 'hi muder fucker', likesCount: 1 },
    ],
    profile: null,
    status: ''
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
    payload?: ProfileAPIType | string
}

type ProfileStatusAPITypeActionCreator = {
    type: string,
    payload?: string | undefined
}
type ActionProfileType = AddPostActioCreatorType | UpdateNewPostTextActionCreatorType | ProfileAPITypeActionCreator | ProfileStatusAPITypeActionCreator

const profileReducer = (state: ProfilePageStateType = initialState, action: ActionProfileType): any => {
    switch (action.type) {

        case ADD_POST: {
            let newPost = {
                id: 5,
                message: action.payload,
                likesCount: 0
            }
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: ''
            }

        }

        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.payload
            }
        case SET_STATUS:
            return {
                ...state,
                status: action.payload
            }
        default:
            return state
    }
}


export const addPostAC = (newPost: string): AddPostActioCreatorType => ({ type: ADD_POST, payload: newPost })
export const setUserProfile = (profile: ProfileAPIType): ProfileAPITypeActionCreator => ({ type: SET_USER_PROFILE, payload: profile })
export const setStatus = (status: any) => ({ type: SET_STATUS, payload: status })


export const getStatus = (userId: number | string | undefined) => {
    return async (dispatch: any) => {
        const response = await profileAPI.getStatus(userId)

        dispatch(setStatus(response.data))
    }
}

export const updateStatus = (status: string | undefined) => {
    return async (dispatch: any) => {
        const response = await profileAPI.updateStatus(status)

        if (response.data.resultCode === 0) {
            dispatch(setStatus(status))
        }
    }
}

export const getUserProfile = (userId: number | string | undefined) => {
    return async (dispatch: any) => {
        const response = await socialAPI.getProfile(userId)
        dispatch(setUserProfile(response.data))
    }
}

export default profileReducer