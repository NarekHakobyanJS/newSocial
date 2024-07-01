import React from 'react'
import './Profile.css'
import ProfileInfo from './ProfileInfo/ProfileInfo'
import MyPostsContainer from './MyPosts/MyPostsContainer'
import { ProfileAPIType } from '../../state/profileReducer'

type ProfilePropsType = {
  profile : ProfileAPIType
  status : string
  isOwner : number
}

const Profile = ({profile, status,isOwner} : ProfilePropsType) => {
  return (
    <div>
      <ProfileInfo isOwner={isOwner} profile={profile} status={status}/>
      <MyPostsContainer />
    </div>
  )
}

export default Profile