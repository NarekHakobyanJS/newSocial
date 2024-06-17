
import axios from 'axios';
import { UsersStateType } from '../../state/usersReducer'
import { NavLink } from 'react-router-dom'



type UsersPropsType = {
    totalUsersCount: number,
    pageSize: number,
    currentPage: number,
    users: Array<UsersStateType>,
    onPageChnaged: (p: number) => void,
    unfollow: (userId: number) => void,
    follow: (userId: number) => void,
    toggleFollowingProgress: (isFetching: boolean, userId : number) => void
    followingInProgres: number []
}

const Users = (props: UsersPropsType) => {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);

    let pages = []

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    return (
        <div>
            <div>
                {
                    pages.map((p: number) => {
                        return <button
                            key={p}
                            onClick={() => props.onPageChnaged(p)}
                            className={p === props.currentPage ? 'activeBTN' : ''}>{p}</button>
                    })
                }
            </div>
            {
                props.users.map((user: any) => {
                    return <div key={user.id}>
                        <span>
                            <div>
                                <NavLink to={'/profile/' + user.id}>
                                    <img width={120} src={user.photos.small === null ? 'https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/corporate-user-icon.png' : user.photos.small} />
                                </NavLink>
                            </div>
                            <div>
                                {user.followed
                                    ? <button
                                        disabled={props.followingInProgres.some((id) => id === user.id)}
                                        onClick={() => {
                                            props.toggleFollowingProgress(true, user.id)
                                            axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${user.id}`, {
                                                withCredentials: true,
                                                headers: {
                                                    "API-KEY": '97b016cf-738c-412b-8c5c-fe131956f90e'
                                                }
                                            })
                                                .then((response) => {
                                                    if (response.data.resultCode === 0) {
                                                        props.unfollow(user.id)
                                                    }
                                                    props.toggleFollowingProgress(false, user.id)
                                                })


                                        }} >unfollow</button>
                                    : <button
                                        disabled={props.followingInProgres.some((id) => id === user.id)}
                                        onClick={() => {
                                            props.toggleFollowingProgress(true, user.id)
                                            axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${user.id}`, {}, {
                                                withCredentials: true,
                                                headers: {
                                                    "API-KEY": '97b016cf-738c-412b-8c5c-fe131956f90e'
                                                }
                                            })
                                                .then((response) => {
                                                    if (response.data.resultCode === 0) {
                                                        props.follow(user.id)
                                                    }
                                                    props.toggleFollowingProgress(false, user.id)
                                                })



                                        }}>follow</button>}
                            </div>
                        </span>
                        <span>
                            <h4>{user.name}</h4>
                            <h3>{user.id}</h3>
                        </span>
                    </div>
                })
            }
        </div>
    )
}

export default Users