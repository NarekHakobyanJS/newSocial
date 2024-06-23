import React, { ChangeEvent, useState } from 'react'
import './ProfileStatus.css'

type ProfileStatusPropsType = {
    status: string
}
const ProfileStatus = (props: ProfileStatusPropsType) => {
    const [editeMode, setEditeMode] = useState(false)
    const [status, setStatus] = useState(props.status)
    const actieteEditeMode = () => setEditeMode(true)

    const deactieteEditeMode = () => {
        setEditeMode(false)
    }

    const changeStatus = (e : ChangeEvent<HTMLInputElement>) => {
        setStatus(e.target.value)
    }
    return (
        <div>
            {
                !editeMode
                    ?
                    <div>
                        <span onDoubleClick={actieteEditeMode}>{props.status}</span>
                    </div>
                    :
                    <div>
                        <input
                            onBlur={deactieteEditeMode}
                            value={status}
                            onChange={changeStatus}
                            />
                    </div>
            }
        </div>
    )
}

export default ProfileStatus