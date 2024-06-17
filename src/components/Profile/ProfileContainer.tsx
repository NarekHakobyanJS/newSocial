import React from 'react'
import './Profile.css'
import Profile from './Profile'
import axios from 'axios'
import { connect } from 'react-redux'
import { ProfileAPIType, setUserProfile } from '../../state/profileReducer'


type ProfileContainerAPIPropsType = {
    setUserProfile : (profile : any) => void
    profile : ProfileAPIType
}

class ProfileContainerAPI extends React.Component<ProfileContainerAPIPropsType> {

    
    componentDidMount(): void {
        axios.get<any, any>(`https://social-network.samuraijs.com/api/1.0/profile/${24961}`)
            .then((response: any) => {
                this.props.setUserProfile(response.data)
            })
    }
    render(): React.ReactNode {
        {console.log(this.props.profile)}
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