import React, { useEffect } from 'react'
import './Profile.css'
import Profile from './Profile'
import { useDispatch, useSelector } from 'react-redux'
import { getUserProfile} from '../../state/profileReducer'
import { Navigate, useParams } from 'react-router-dom'


type ProfileContainerPropsType = {
}

function ProfileContainer(props: ProfileContainerPropsType) {
   const dispatch = useDispatch<any>()
    const {id} = useParams();
    const profile = useSelector((state : any) => state.profilePage.profile)
    const {isAuth} = useSelector((state : any)  => state.auth)

    useEffect(() => {

      dispatch(getUserProfile(id))
    }, [])
    
    if(!isAuth){
        return <Navigate to='/login'/>
    }
    return (
        <div>
            <Profile profile={profile} />
        </div>
    )
}

export default ProfileContainer