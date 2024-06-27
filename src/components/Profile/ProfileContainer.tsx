import React, { useEffect } from 'react'
import './Profile.css'
import Profile from './Profile'
import { useDispatch, useSelector } from 'react-redux'
import { getStatus, getUserProfile} from '../../state/profileReducer'
import { Navigate, useParams } from 'react-router-dom'


type ProfileContainerPropsType = {
}


function ProfileContainer(props: ProfileContainerPropsType) {
   const dispatch = useDispatch<any>()
    const {id} = useParams();
    const {profile, status} = useSelector((state : any) => state.profilePage)
    const {isAuth} = useSelector((state : any)  => state.auth)

    useEffect(() => {

      dispatch(getUserProfile(id))
      dispatch(getStatus(id))
    }, [])
    
    // if(!isAuth){
    //     return <Navigate to='/login'/>
    // }
    return (
        <div>
            <Profile status={status} profile={profile} />
        </div>
    )
}

export default ProfileContainer
