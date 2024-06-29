import { useState } from 'react'
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
    toggleFollowingProgress: (isFetching: boolean, userId: number) => void
    followingInProgres: number[]
}

const Users = (props: UsersPropsType) => {

    let portionSize = 10
    let [portionNumber, setPortionNumber] = useState(1)
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
    let rightPortionPageNumber = portionNumber * portionSize
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);

    let pages = []

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    return (
        <div>
            <div>
                {
                    portionNumber > 1 && 
                    <button onClick={() => {setPortionNumber(portionNumber - 1)}}>prev</button>
                }
                {
                    pages
                    .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                    .map((p: number) => {
                        return <button
                            key={p}
                            onClick={() => props.onPageChnaged(p)}
                            className={p === props.currentPage ? 'activeBTN' : ''}>{p}</button>
                    })
                }
                {
                    pagesCount > portionNumber && 
                    <button onClick={() => {setPortionNumber(portionNumber + 1)}}>next</button>
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
                                        onClick={() => { props.unfollow(user.id) }} >unfollow</button>
                                    : <button
                                        disabled={props.followingInProgres.some((id) => id === user.id)}
                                        onClick={() => { props.follow(user.id) }}>follow</button>}
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