import { profileAPI, socialAPI } from "../api/api";
import { PhotosType } from "../types/types";
const ADD_POST = "profile/ADD_POST";
const SET_USER_PROFILE = 'profile/SET_USER_PROFILE'
const SET_STATUS = "profile/SET_STATUS"
const SAVE_PHOTO = '/profileSAVE_PHOTO'


export type PostType = {
    id: number,
    message: string | undefined,
    likesCount: number
}

export type PostDataType = Array<PostType>

export type ProfileAPIType = any


export type ProfilePageStateType = {
    newPostText: any
    posts: PostDataType
    profile: any
    status: string | undefined
}
type ContactsType = {
    facebook: string | null,
    website: string | null,
    vk: string | null,
    twitter: string | null,
    instagram: string | null,
    youtube: string | null,
    github: string | null,
    mainLink: string | null,
}

// Profile
type ProfileType = {
    aboutMe: string,
    contacts: ContactsType,
    lookingForAJob: boolean,
    lookingForAJobDescription: string,
    fullName: string,
    userId: number,
    photos: PhotosType
}

const initialState = {
    newPostText: '' as string,
    posts: [
        { id: 1, message: 'hi muder fucker', likesCount: 1 },
        { id: 2, message: 'hi muder fucker', likesCount: 1 },
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: '' as string
}

export type InitialStateType = typeof initialState

type UpdateNewPostTextActionCreatorType = {
    type: string,
    payload?: string
}

type ProfileAPITypeActionCreator = {
    type: string,
    payload?: ProfileAPIType | string | any
}

type ProfileStatusAPITypeActionCreator = {
    type: string,
    payload?: string | undefined
}
type ActionProfileType = AddPostActioCreatorType | UpdateNewPostTextActionCreatorType | ProfileAPITypeActionCreator | ProfileStatusAPITypeActionCreator

const profileReducer = (state = initialState, action: ActionProfileType): InitialStateType => {
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
        case SAVE_PHOTO:
            return {
                ...state,
                profile: { ...state.profile, photos: action.payload } as ProfileType
            }
        default:
            return state
    }
}

type AddPostActioCreatorType = {
    type: typeof ADD_POST,
    payload: string
}

export const addPostAC = (newPost: string): AddPostActioCreatorType => ({ type: ADD_POST, payload: newPost })
type SetUserProfileActioType = {
    type: typeof SET_USER_PROFILE
    payload: ProfileType
}
export const setUserProfile = (profile: ProfileType): SetUserProfileActioType => ({ type: SET_USER_PROFILE, payload: profile })
type SetStatusActionType = {
    type : typeof SET_STATUS,
    payload : string
}
export const setStatus = (status: string) : SetStatusActionType => ({ type: SET_STATUS, payload: status })
type SavePhotoSuccessActionType = {
    type : typeof SAVE_PHOTO,
    paylaod : PhotosType
}
export const savePhotoSuccess = (photos: PhotosType) :  SavePhotoSuccessActionType => ({ type: SAVE_PHOTO, paylaod: photos })


export const getStatus = (userId: number | string | undefined) => {
    return async (dispatch: any) => {
        const response = await profileAPI.getStatus(userId)

        dispatch(setStatus(response.data))
    }
}

export const updateStatus = (status: string) => {
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

export const savePhoto = (file: any) => {
    return async (dispatch: any) => {
        const response = await profileAPI.savePhoto(file)
        dispatch(savePhotoSuccess(response.data.photos))
    }
}

export const saveProfile = (profile: any) => {
    return async (dispatch: any, getState: any) => {
        let userId = getState().auth.userId

        const response = await profileAPI.saveProfile(profile)
        dispatch(getUserProfile(userId))
    }
}

export default profileReducer