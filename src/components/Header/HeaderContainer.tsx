import React from 'react'
import './Header.css'
import Header from './Header'
import { connect } from 'react-redux'
import { getAuthUserData } from '../../state/authReducer'

type HeaderContainerPropsType = {
    getAuthUserData : () => void
    isAuth: boolean,
    login: string
}
class HeaderContainer extends React.Component<HeaderContainerPropsType> {

    // componentDidMount(): void {
    //     this.props.getAuthUserData()
    // }
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

const mapStateToProps = (state: any) => {
    return {
        isAuth: state.auth.isAuth,
        login: state.auth.login
    }
}
export default connect(mapStateToProps, { getAuthUserData })(HeaderContainer)