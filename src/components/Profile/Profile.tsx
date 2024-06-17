import React from 'react'
import './Profile.css'
import ProfileInfo from './ProfileInfo/ProfileInfo'
import MyPostsContainer from './MyPosts/MyPostsContainer'
import { ProfileAPIType } from '../../state/profileReducer'

type ProfilePropsType = {
  profile : ProfileAPIType
}

const Profile = ({profile} : ProfilePropsType) => {
  return (
    <div>
      <ProfileInfo profile={profile}/>
      <MyPostsContainer />
    </div>
  )
}

export default Profile