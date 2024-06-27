import React, { ChangeEvent } from 'react'
import './Dialogs.css'
import DialogsItem from './DialogsItem/DialogsItem'
import Message from './Message/Message'
import { Navigate } from 'react-router-dom'
import { Field, Formik } from 'formik'


type AddMessageForm = {
    newMessage : string,
    onSubmit : (values : any) => void
}

const AddMessageForm = ({ onSubmit} : AddMessageForm) => {
    
    return (
        <Formik
            initialValues={{
                newMessage : ''
            }}
            onSubmit={(values) => onSubmit(values)}
        >
            {
                ({handleSubmit}) => (
                    <form onSubmit={handleSubmit}>
                        <Field name='newMessage' component={'textarea'} />
                    {/* <textarea value={newMessage} onChange={onNewMessageChange} /> */}
                    <button type='submit'>send</button>
                </form>
                )
            }
        </Formik>
    )
}
////
type DialogsPropsType = {
    dialogsPage: any
    updateNewMessageBody: (body: string) => void
    sendMessage: (newMessage : string) => void,
    isAuth: boolean

}

const Dialogs = (props: DialogsPropsType) => {
    const dialogs = props.dialogsPage.dialogs;
    const messages = props.dialogsPage.messages;
    const newMessage = props.dialogsPage.newMessage


    const addNewMessage = (values : any) => {
        console.log(values.newMessage);
        props.sendMessage(values.newMessage)
        
    }
    // if (!props.isAuth) {
    //     return <Navigate to='/login' />
    // }
    return (
        <div className='dialogs'>
            <div>
                {
                    dialogs.map((dialog: any) => {
                        return <DialogsItem key={dialog.id} dialog={dialog} />
                    })
                }

            </div>
            <div>
                < AddMessageForm
                    onSubmit={addNewMessage} 
                    newMessage={newMessage}
    
                />
                {
                    messages.map((message: any) => {
                        return <Message key={message.id} message={message} />
                    })
                }

            </div>
        </div>
    )
}

export default Dialogs