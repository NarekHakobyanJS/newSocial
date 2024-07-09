
import { socialAPI } from "../api/api"
import { PhotosType } from "../types/types"
// import { AppDispatch } from "./store"

const FOLLOW = 'FOLLOW'
const UNFOLLOW = "UNFOLLOW"
const SET_USERS = 'SET_USERS'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'
const TOGGLE_IS_FOLLOWING_IN_PROGRES = 'TOGGLE_IS_FOLLOWING_IN_PROGRES'

export type UserType = {
    name: string,
    id: number,
    photos: PhotosType,
    status: null,
    followed: boolean,
}


const initialState = {
    users: [] as Array<UserType>,
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFettching: false,
    followingInProgres: [] as Array<number>
}
type initialState = typeof initialState

const usersReducer = (state = initialState, action: any): initialState => {
    switch (action.type) {
        case FOLLOW: {
            return {
                ...state,
                users: state.users.map((u: any) => {
                    if (u.id === action.userId) {
                        return {
                            ...u,
                            followed: true
                        }
                    } else {
                        return u
                    }
                })
            }
        }
        case UNFOLLOW: {
            return {
                ...state,
                users: state.users.map((u: any) => {
                    if (u.id === action.userId) {
                        return {
                            ...u,
                            followed: false
                        }
                    } else {
                        return u
                    }
                })
            }
        }
        case SET_USERS: {
            return {
                ...state,
                users: action.users
            }
        }
        case SET_CURRENT_PAGE: {
            return {
                ...state,
                currentPage: action.currentPage
            }
        }
        case SET_TOTAL_USERS_COUNT:
            return {
                ...state,
                totalUsersCount: action.count
            }
        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFettching: action.isFetching
            }
        case TOGGLE_IS_FOLLOWING_IN_PROGRES:
            return {
                ...state,
                followingInProgres: action.isFetching
                    ? [...state.followingInProgres, action.userId]
                    : state.followingInProgres.filter(id => id !== action.userId)

            }
        default:
            return state
    }
}

type FollowSuccessActionType = {
    type: typeof FOLLOW,
    userId: number
}
export const followSuccess = (userId: number): FollowSuccessActionType => ({ type: FOLLOW, userId })
type UnfollowSuccessActionType = {
    type: typeof UNFOLLOW,
    userId: number
}
export const unfollowSuccess = (userId: number): UnfollowSuccessActionType => ({ type: UNFOLLOW, userId })
type SetUserActionType = {
    type: typeof SET_USERS,
    users: Array<UserType>
}
export const setUsers = (users: Array<UserType>): SetUserActionType => ({ type: SET_USERS, users })
type SetCurrentPageActionType = {
    type: typeof SET_CURRENT_PAGE,
    currentPage: number
}
export const setCurrentPage = (currentPage: number): SetCurrentPageActionType => ({ type: SET_CURRENT_PAGE, currentPage: currentPage })
type SetTotalUserCountActionType = {
    type: typeof SET_TOTAL_USERS_COUNT,
    count: number
}
export const setTotalUserCount = (totalUsersCount: number): SetTotalUserCountActionType => ({ type: SET_TOTAL_USERS_COUNT, count: totalUsersCount })
type ToggleIsFetchingActionType = {
    type: typeof TOGGLE_IS_FETCHING,
    isFetching: boolean
}
export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingActionType => ({ type: TOGGLE_IS_FETCHING, isFetching: isFetching })
type ToggleFollowingProgressActionType = {
    type: typeof TOGGLE_IS_FOLLOWING_IN_PROGRES,
    isFetching: boolean,
    userId: number

}
export const toggleFollowingProgress = (isFetching: boolean, userId: number): ToggleFollowingProgressActionType => ({ type: TOGGLE_IS_FOLLOWING_IN_PROGRES, isFetching: isFetching, userId: userId })


export const getUsers = (currentPage: number, pageSize: number) => {
    return (dispatch: any) => {

        dispatch(toggleIsFetching(true));

        socialAPI.getUsers(currentPage, pageSize)
            .then((data: any) => {
                dispatch(toggleIsFetching(false))
                dispatch(setTotalUserCount(data.totalCount))
                dispatch(setUsers(data.items))
            })
    }
}

export const follow = (userId: number) => {
    return (dispatch: any) => {

        dispatch(toggleFollowingProgress(true, userId))

        socialAPI.follow(userId)
            .then((response) => {
                if (response.data.resultCode === 0) {
                    dispatch(followSuccess(userId))
                }
                dispatch(toggleFollowingProgress(false, userId))
            })



    }
}

export const unfollow = (userId: number) => {
    return (dispatch: any) => {

        dispatch(toggleFollowingProgress(true, userId))

        socialAPI.unfollow(userId)
            .then((response) => {
                if (response.data.resultCode === 0) {
                    dispatch(unfollowSuccess(userId))
                }
                dispatch(toggleFollowingProgress(false, userId))
            })



    }
}

export default usersReducer