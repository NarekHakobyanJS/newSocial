import React from 'react'
import './Profile.css'
import ProfileInfo from './ProfileInfo/ProfileInfo'
import MyPostsContainer from './MyPosts/MyPostsContainer'
import { ProfileAPIType } from '../../state/profileReducer'

type ProfilePropsType = {
  profile : ProfileAPIType
  status : string
}

const Profile = ({profile, status} : ProfilePropsType) => {
  return (
    <div>
      <ProfileInfo profile={profile} status={status}/>
      <MyPostsContainer />
    </div>
  )
}

export default Profile