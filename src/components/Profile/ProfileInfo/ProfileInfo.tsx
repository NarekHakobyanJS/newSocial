import React from 'react'
import { ProfileAPIType } from '../../../state/profileReducer'

type ProfileInfoPropsType = {
    profile : ProfileAPIType
  }

const ProfileInfo = ({profile} : ProfileInfoPropsType) => {
    if(!profile){
        return <h1>loading...</h1>
    }
    
    return (
        <div>
            <img src='https://t4.ftcdn.net/jpg/01/96/52/31/360_F_196523185_k6LSUluqRnbrVsOskQcujOsxvnhHE87p.jpg' />

            <div>
                <h3>{profile.fullName} </h3>
                <img src={profile?.photos?.large} />
                ava + description
            </div>
        </div>
    )
}

export default ProfileInfo