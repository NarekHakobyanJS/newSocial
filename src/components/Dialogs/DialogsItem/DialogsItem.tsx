import React from 'react'
import { NavLink } from 'react-router-dom'

type DialogItemPropsType = {
    dialog : {
        name : string
        id : number
    }

}
const DialogsItem = ({dialog} : DialogItemPropsType) => {
    return (
        <div>
            <div>
            <NavLink to={`/dialogs/${dialog.id}`}>{dialog.name}</NavLink>
            </div>
        </div>
    )
}


export default DialogsItem