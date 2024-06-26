
import React from 'react'
import Users from './Users'


import './Users.css'

type UsersPropsType = {
    users: Array<any>
    unfollow: (userId: number) => void
    follow: (userId: number) => void,
    pageSize: number,
    totalUsersCount: number
    currentPage: number,
    isFettching: boolean
    setCurrentPage: (p: number) => void
    setTotalUserCount: (totalCount: number) => void
    toggleIsFetching: (isFetching: boolean) => void
    toggleFollowingProgress: (isFetching: boolean, userId: number) => void
    followingInProgres: number[],
    getUsers: (currentPage: number, pageSize: number) => void
}



class UsersAPIComponnet extends React.Component<UsersPropsType> {


    componentDidMount(): void {
        this.props.getUsers(this.props.currentPage, this.props.pageSize)
    }


    onPageChnaged = (page: number) => {
        this.props.getUsers(page, this.props.pageSize)
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