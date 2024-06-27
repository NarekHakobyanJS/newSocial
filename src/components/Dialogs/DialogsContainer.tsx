import './Dialogs.css'
import { sendMessageAC} from '../../state/dialogsReducer';
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
        sendMessage : (newMessage : string) => {
            dispatch(sendMessageAC(newMessage))
        }
    }
}
const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs)
export default DialogsContainer