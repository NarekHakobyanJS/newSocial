import { useState } from 'react'
import { ProfileAPIType, savePhoto, saveProfile } from '../../../state/profileReducer'
import ProfileStatus from '../ProfileStatus/ProfileStatus'
import { useDispatch } from 'react-redux'
import './ProfileInfo.css'
import ProfileDataForm from '../ProfileDataForm/ProfileDataForm'

type ProfileInfoPropsType = {
    profile: ProfileAPIType
    status: string
    isOwner: number
}

const ProfileInfo = ({ profile, status, isOwner }: ProfileInfoPropsType) => {
    const [editeMode, setEditeMode] = useState(false)


    const dispatch = useDispatch<any>()
    if (!profile) {
        return <h1>loading...</h1>
    }

    const mainPhotoSelected = (e: any) => {
        if (e.target.files.length) {
            dispatch(savePhoto(e.target.files[0]))
        }

    }

    const onSubmit = (formData: any) => {
        dispatch(saveProfile(formData));
        setEditeMode(false)
    }

    return (
        <div>
            <div>
                <h3>{profile.fullName} </h3>
                <img src={profile?.photos?.large || 'https://static.vecteezy.com/system/resources/thumbnails/027/951/137/small_2x/stylish-spectacles-guy-3d-avatar-character-illustrations-png.png'} />
                {
                    isOwner === 31379 ? <input type={'file'} onChange={mainPhotoSelected} /> : ''
                }
                {
                    editeMode ? <ProfileDataForm profile={profile} onSubmit={onSubmit} /> : <ProfileData profile={profile} isOwner={isOwner} goToEditeMode={() => setEditeMode(true)} />
                }
                <ProfileStatus status={status} />
            </div>
        </div>
    )
}

type ProfileDataPropsType = {
    profile: ProfileAPIType
    isOwner: number
    goToEditeMode: () => void
}

const ProfileData = ({ profile, isOwner, goToEditeMode }: ProfileDataPropsType) => {
    return (
        <div>
            <div>
                <button onClick={goToEditeMode}>edite</button>
            </div>
            <div>
                <b>fullName :</b>{profile.fullName}
            </div>
            <div>
                <b>Loking for job : </b>{profile.lookingForAJob ? 'yes' : 'no'}
            </div>
            {
                profile.lookingForAJob && <div>
                    <b>my profetional skils : </b> {profile.lookingForAJobDescription}
                </div>
            }
            <div>
                <b>about me :</b>{profile.aboutMe}
            </div>
            <div>
                <b>contacts :</b>
                {Object.keys(profile.contacts).map((key: any) => <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]} />)}

            </div>
        </div>
    )
}


const Contact = ({ contactTitle, contactValue }: any) => {
    return (
        <div className='contact'>
            <b>{contactTitle} : {contactValue} </b>
        </div>
    )
}
export default ProfileInfo