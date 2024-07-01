import React, { useEffect } from 'react'
import { ProfileAPIType, savePhoto } from '../../../state/profileReducer'
import ProfileStatus from '../ProfileStatus/ProfileStatus'
import { useDispatch, useSelector } from 'react-redux'

type ProfileInfoPropsType = {
    profile: ProfileAPIType
    status: string
    isOwner: number
}

const ProfileInfo = ({ profile, status, isOwner }: ProfileInfoPropsType) => {
    
  
    
    const dispatch = useDispatch<any>()
    if (!profile) {
        return <h1>loading...</h1>
    }
   
    const mainPhotoSelected = (e : any) => {
        if(e.target.files.length){
            dispatch(savePhoto(e.target.files[0]))
        }
        
    }
    return (
        <div>
            <div>
                <h3>{profile.fullName} </h3>
                <img src={profile?.photos?.large || 'https://static.vecteezy.com/system/resources/thumbnails/027/951/137/small_2x/stylish-spectacles-guy-3d-avatar-character-illustrations-png.png'} />
                {
                    isOwner === 31379 ? <input type={'file'} onChange={mainPhotoSelected} /> : ''
                }
                <ProfileStatus status={status} />
            </div>
        </div>
    )
}

export default ProfileInfo