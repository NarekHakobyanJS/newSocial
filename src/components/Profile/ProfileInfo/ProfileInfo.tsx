import React from 'react'
import { ProfileAPIType } from '../../../state/profileReducer'
import ProfileStatus from '../ProfileStatus/ProfileStatus'

type ProfileInfoPropsType = {
    profile : ProfileAPIType
  }

const ProfileInfo = ({profile} : ProfileInfoPropsType) => {
    if(!profile){
        return <h1>loading...</h1>
    }
    
    return (
        <div>
            <div>
                <h3>{profile.fullName} </h3>
                <img src={profile?.photos?.large} />
                <ProfileStatus status={'yoyio'}/> 
            </div>
        </div>
    )
}

export default ProfileInfo