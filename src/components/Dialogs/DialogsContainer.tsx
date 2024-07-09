import './Dialogs.css'
import { sendMessageAC} from '../../state/dialogsReducer';
import Dialogs from './Dialogs';
import { connect } from 'react-redux';
import { AppStateType } from '../../state/store';

const mapStateToProps = (state : AppStateType) => {
    return {
        dialogsPage : state.dialogsPage,
        isAuth : state.auth.isAuth
    }
}

const mapDispatchToProps = (dispatch : any) => {
    return {
        sendMessage : (newMessage : string) => {
            dispatch(sendMessageAC(newMessage))
        }
    }
}
const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs)
export default DialogsContainer