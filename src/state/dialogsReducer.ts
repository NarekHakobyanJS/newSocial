const SEND_MESSAGE = 'dialogs/SEND_MESSAGE';

type DialogsType = {
    id: number,
    name: string
}


type MessagesType = {
    id: number,
    message: string
}

const initialState = {
    messages: [
        { id: 1, message: 'its my 1 post' },
        { id: 2, message: 'its my 3 post' },
    ] as Array<MessagesType>,
    dialogs: [
        { id: 1, name: "Narek" },
        { id: 2, name: "Sveta" }
    ] as Array<DialogsType>,
    newMessage: '' as string
}

export type InitialStateType = typeof initialState
type ActionsType = SendMessageACType
const dialogsReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        
        case SEND_MESSAGE: {
           
            return {
                ...state,
                messages: [...state.messages, { id: 5, message: action.payload }],
                newMessage: '',
            }
        }
        default:
            return state
    }
}

type SendMessageACType = {
    type : typeof SEND_MESSAGE,
    payload : string
}
export const sendMessageAC = (newMessage : string) : SendMessageACType => ({ type: SEND_MESSAGE, payload : newMessage })


export default dialogsReducer