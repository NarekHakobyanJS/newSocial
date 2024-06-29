
import { socialAPI } from "../api/api"
// import { AppDispatch } from "./store"

const FOLLOW = 'FOLLOW'
const UNFOLLOW = "UNFOLLOW"
const SET_USERS = 'SET_USERS'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'
const TOGGLE_IS_FOLLOWING_IN_PROGRES = 'TOGGLE_IS_FOLLOWING_IN_PROGRES'

export type UsersStateType = {
    name: string,
    id: number,
    photos: object,
    status: null,
    followed: boolean,
}
type UserPageStateType = {
    users: Array<UsersStateType>,
    pageSize: number,
    totalUsersCount: number,
    currentPage: number,
    isFettching: boolean,
    followingInProgres: number[]
}

const initialState: UserPageStateType = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFettching: false,
    followingInProgres: []
}

const usersReducer = (state: UserPageStateType = initialState, action: any): UserPageStateType => {
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

export const followSuccess = (userId: number) => ({ type: FOLLOW, userId })
export const unfollowSuccess = (userId: number) => ({ type: UNFOLLOW, userId })
export const setUsers = (users: any) => ({ type: SET_USERS, users })
export const setCurrentPage = (currentPage: number) => ({ type: SET_CURRENT_PAGE, currentPage: currentPage })
export const setTotalUserCount = (totalUsersCount: number) => ({ type: SET_TOTAL_USERS_COUNT, count: totalUsersCount })
export const toggleIsFetching = (isFetching: boolean) => ({ type: TOGGLE_IS_FETCHING, isFetching: isFetching })
export const toggleFollowingProgress = (isFetching: boolean, userId: number) => ({ type: TOGGLE_IS_FOLLOWING_IN_PROGRES, isFetching: isFetching, userId: userId })


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