import { ChangeEvent, useEffect, useState } from 'react'
import './ProfileStatus.css'
import { updateStatus } from '../../../state/profileReducer'
import { useDispatch } from 'react-redux'

type ProfileStatusPropsType = {
    status: string
}
const ProfileStatus = (props: ProfileStatusPropsType) => {
    const [editeMode, setEditeMode] = useState(false)
    const [status, setStatus] = useState(props.status)
    
    useEffect(() => {
        setStatus(props.status)
    }, [props.status])
    const dispatch = useDispatch<any>()
    
    const activetEditeMode = () => {
        setEditeMode(true)
    } 
    
    const deactivetEditeMode = () => {
        setEditeMode(false)
        dispatch(updateStatus(status))
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
                        <span onDoubleClick={activetEditeMode}>{props.status ? props.status : 'no status'}</span>
                    </div>
                    :
                    <div>
                        <input
                            onBlur={deactivetEditeMode}
                            value={status}
                            onChange={changeStatus}
                            />
                    </div>
            }
        </div>
    )
}

export default ProfileStatus