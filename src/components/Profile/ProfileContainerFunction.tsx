import React, { useEffect } from 'react'
import './Profile.css'
import Profile from './Profile'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setUserProfile } from '../../state/profileReducer'
import { useParams } from 'react-router-dom'


type ProfileContainerPropsType = {
    
}

function ProfileContainer(props: ProfileContainerPropsType) {
    const dispatch = useDispatch()
    const params = useParams();
    const profile = useSelector((state : any) => state.profilePage.profile)
    useEffect(() => {
        axios.get<any, any>(`https://social-network.samuraijs.com/api/1.0/profile/${params.id}`)
            .then((response: any) => {
                dispatch(setUserProfile(response.data))
            })
    }, [])



    return (
        <div>
            <Profile profile={profile} />
        </div>
    )
}

export default ProfileContainer