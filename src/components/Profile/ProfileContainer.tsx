import React from 'react'
import './Profile.css'
import Profile from './Profile'
import axios from 'axios'
import { connect } from 'react-redux'
import { ProfileAPIType, setUserProfile } from '../../state/profileReducer'
import { socialAPI } from '../../api/api'


type ProfileContainerAPIPropsType = {
    setUserProfile : (profile : any) => void
    profile : ProfileAPIType
}

class ProfileContainerAPI extends React.Component<ProfileContainerAPIPropsType> {

    
    componentDidMount(): void {
        //socialAPI.getProfile(24961)
        axios.get<any, any>(`https://social-network.samuraijs.com/api/1.0/profile/${24961}`)
            .then((response: any) => {
                this.props.setUserProfile(response.data)
            })
    }
    render(): React.ReactNode {
        return (
            <div>
                <Profile profile={this.props.profile}/>
            </div>
        )
    }
}

const mapStateToProps = (state: any) => {
    return {
        profile : state.profilePage.profile
    }
}


const ProfileContainer = connect(mapStateToProps, { setUserProfile })(ProfileContainerAPI)

export default ProfileContainer