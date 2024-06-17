import React, { useEffect } from 'react'
import './Profile.css'
import Profile from './Profile'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { getUserProfile} from '../../state/profileReducer'
import { useParams } from 'react-router-dom'


type ProfileContainerPropsType = {
}

function ProfileContainer(props: ProfileContainerPropsType) {
   const dispatch = useDispatch<any>()
    const {id} = useParams();
    const profile = useSelector((state : any) => state.profilePage.profile)
    useEffect(() => {

      dispatch(getUserProfile(id))
    }, [])
    
    return (
        <div>
            <Profile profile={profile} />
        </div>
    )
}

export default ProfileContainer