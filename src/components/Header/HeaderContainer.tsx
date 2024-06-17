import React from 'react'
import './Header.css'
import Header from './Header'
import axios from 'axios'
import { connect } from 'react-redux'
import { setAuthUserData } from '../../state/authReducer'

type HeaderContainerPropsType = {
    setAuthUserData : (userId: number, email: string, login: string) => void,
    isAuth : boolean,
    login : string
}
class HeaderContainer extends React.Component<HeaderContainerPropsType>{
    
    componentDidMount(): void {
        axios.get('https://social-network.samuraijs.com/api/1.1/auth/me', {
                withCredentials : true
        }).then((response) => {
                const {login, email, userId} = response.data.data
                if(response.data.resultCode === 0){
                    this.props.setAuthUserData(userId, email, login)
                }
            })
    }
    render(): React.ReactNode {
        return (
            <>
                <Header 
                    isAuth={this.props.isAuth}
                    login={this.props.login}
                />
            </>
          )
    }
}

const mapStateToProps = (state : any) => {
    return {
        isAuth : state.auth.isAuth,
        login : state.auth.login
    }
}
export default connect(mapStateToProps, {setAuthUserData}) (HeaderContainer)