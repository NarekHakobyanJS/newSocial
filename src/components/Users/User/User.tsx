
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { follow, unfollow } from '../../../state/usersReducer'

type UserPropsType = {
    user: any,
    followingInProgres: any
}
const User = ({ user, followingInProgres }: UserPropsType) => {

    const dispatch = useDispatch<any>()

    return (

        <div key={user.id}>
            <span>
                <div>
                    <NavLink to={'/profile/' + user.id}>
                        <img width={120} src={user.photos.small === null ? 'https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/corporate-user-icon.png' : user.photos.small} />
                    </NavLink>
                </div>
                <div>
                    {user.followed
                        ? <button

                            disabled={followingInProgres.some((id: number) => id === user.id)}
                            onClick={() => { dispatch(unfollow(user.id)) }} >unfollow</button>
                        : <button
                            disabled={followingInProgres.some((id: number) => id === user.id)}
                            onClick={() => { dispatch(follow(user.id)) }}>follow</button>}
                </div>
            </span>
            <span>
                <h4>{user.name}</h4>
                <h3>{user.id}</h3>
            </span>
        </div>

    )
}

export default User