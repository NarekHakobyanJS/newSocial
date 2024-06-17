type MessagePropsType = {
    message : {
        message : string,
        id : number
    }
}

const Message = ({message} : MessagePropsType) => {
    return (
        <div>
            <div>
                {message.message}
            </div>
        </div>
    )
}

export default Message