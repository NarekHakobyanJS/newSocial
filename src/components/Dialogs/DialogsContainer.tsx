import './Dialogs.css'
import { sendMessageAC, updateNewMessageBodyAC } from '../../state/dialogsReducer';
import Dialogs from './Dialogs';
import { connect } from 'react-redux';

type DialogsContainerPropsType = {
    store : any
}

const mapStateToProps = (state : any) => {
    return {
        dialogsPage : state.dialogsPage,
        isAuth : state.auth.isAuth
    }
}

const mapDispatchToProps = (dispatch : any) => {
    return {
        updateNewMessageBody : (body : string) => {
            dispatch(updateNewMessageBodyAC(body))
        },
        sendMessage : () => {
            dispatch(sendMessageAC())
        }
    }
}
const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs)
export default DialogsContainer