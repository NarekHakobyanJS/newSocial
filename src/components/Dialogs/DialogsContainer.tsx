import './Dialogs.css'
import { sendMessageAC, updateNewMessageBodyAC } from '../../state/dialogsReducer';
import Dialogs from './Dialogs';
import { connect } from 'react-redux';

type DialogsContainerPropsType = {
    store : any
}

// const DialogsContainer = (props: DialogsContainerPropsType ) => {
    
//     const dialogsPage = props.store.getState().dialogsPage;

//     const onSendMessageClick = () => {
//         props.store.dispatch(sendMessageAC())
//     }

//     const onNewMessageChange = (body : string) => {
//         props.store.dispatch(updateNewMessageBodyAC(body))
//     }
//     return (
//         <div className='dialogs'>
//           <Dialogs 
//             updateNewMessageBody={onNewMessageChange}
//             sendMessage={onSendMessageClick}
//             dialogsPage={dialogsPage}
//           />
//         </div>
//     )
// }


const mapStateToProps = (state : any) => {
    return {
        dialogsPage : state.dialogsPage
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