
const SEND_MESSAGE = 'dialogs/SEND_MESSAGE';

type DialogsType = {
    id: number,
    name: string
}

export type DialogsDataType = Array<DialogsType>

type MessagesType = {
    id: number,
    message: string
}
export type MessagesDataType = Array<MessagesType>


export type DialogsPageStateType = {
    messages: MessagesDataType,
    dialogs: DialogsDataType,
    newMessage: string
}

const initialState: DialogsPageStateType = {
    messages: [
        { id: 1, message: 'its my 1 post' },
        { id: 2, message: 'its my 3 post' },
    ],
    dialogs: [
        { id: 1, name: "Narek" },
        { id: 2, name: "Sveta" }
    ],
    newMessage: ''
}


const dialogsReducer = (state: DialogsPageStateType = initialState, action: any): DialogsPageStateType => {
    switch (action.type) {
        
        case SEND_MESSAGE: {
           
            return {
                ...state,
                messages: [...state.messages, { id: 5, message: action.payload }],
                newMessage: ''
            }
        }
        default:
            return state
    }
}

export const sendMessageAC = (newMessage : string) => ({ type: SEND_MESSAGE, payload : newMessage })


export default dialogsReducer