import axios, { AxiosResponse } from 'axios'
import React from 'react'
import './Users.css'
import Users from './Users'
import { socialAPI } from '../../api/api'

type UsersPropsType = {
    users: Array<any>
    setUsers: (users: Array<any>) => void
    unfollow: (userId: number) => void
    follow: (userId: number) => void,
    pageSize: number,
    totalUsersCount: number
    currentPage: number,
    isFettching: boolean
    setCurrentPage: (p: number) => void
    setTotalUserCount: (totalCount: number) => void
    toggleIsFetching: (isFetching: boolean) => void
    toggleFollowingProgress : (isFetching: boolean, userId : number) => void
    followingInProgres : number [],
    getUsersThunkCreator : (currentPage : number, pageSize : number) => void
}



class UsersAPIComponnet extends React.Component<UsersPropsType> {


    componentDidMount(): void {
        this.props.getUsersThunkCreator(this.props.currentPage, this.props.pageSize)
        // this.props.toggleIsFetching(true)
        // socialAPI.getUsers(this.props.currentPage, this.props.pageSize)
        //     .then((data: any) => {
        //         this.props.toggleIsFetching(false)
        //         this.props.setTotalUserCount(data.totalCount)
        //         this.props.setUsers(data.items)

        //     })
    }


    onPageChnaged = (page: number) => {
        this.props.toggleIsFetching(true)
        this.props.setCurrentPage(page)
        socialAPI.getUsers(page, this.props.pageSize)
            .then((data: any) => {
                this.props.toggleIsFetching(false)
                this.props.setUsers(data.items)
            })
    }
    render() {

        return (
            <div>
                {
                    this.props.isFettching && <h1>Loading...</h1>
                }
                <Users
                    totalUsersCount={this.props.totalUsersCount}
                    pageSize={this.props.pageSize}
                    currentPage={this.props.currentPage}
                    users={this.props.users}
                    onPageChnaged={this.onPageChnaged}
                    unfollow={this.props.unfollow}
                    follow={this.props.follow}
                    toggleFollowingProgress={this.props.toggleFollowingProgress}
                    followingInProgres={this.props.followingInProgres}
                />
            </div>
        )
    }

}

export default UsersAPIComponnet