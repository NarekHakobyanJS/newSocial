import { connect } from 'react-redux'
import { follow, setUsers, unfollow, setCurrentPage, setTotalUserCount, toggleIsFetching, toggleFollowingProgress, getUsers } from '../../state/usersReducer'
import UsersAPIComponnet from './UsersC'

const mapStateToProps = (state: any) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFettching: state.usersPage.isFettching,
        followingInProgres : state.usersPage.followingInProgres,
        filter : state.usersPage.filter
    }
}

const UsersContainer = connect(mapStateToProps, {
    follow,
    unfollow,
    setUsers,
    setCurrentPage,
    setTotalUserCount,
    toggleIsFetching,
    toggleFollowingProgress,
    getUsers
})(UsersAPIComponnet)
export default UsersContainer