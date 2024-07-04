import { ProfileAPIType } from "../../../state/profileReducer"
import './ProfileDataForm.css'
import { Field, Form, Formik } from "formik"
type ProfileDataFormPropsType = {
    profile: ProfileAPIType
    onSubmit : (formData : any) => void
}
const ProfileDataForm = ({ profile, onSubmit }: ProfileDataFormPropsType) => {
    return (
        <div>
            <Formik
                initialValues={{
                    fullName : '',
                    lookingForAJob : false,
                    lookingForAJobDescription : "",
                    aboutMe : '',
                }}
                onSubmit={(values) => onSubmit(values)}
            >
                {
                    () => (
                        <Form>
                            <div>
                                <b>fullName :</b><Field name='fullName'/>
                            </div>
                            <div>
                                <b>Loking for job : </b> <Field type="checkbox" name='lookingForAJob'/>
                            </div>
                            <div>
                                <b>My Proffetiona skils :</b> <Field type='textarea' name='lookingForAJobDescription'/>
                            </div>
                            <div>
                                <b>about me :</b><Field name='aboutMe'/>
                            </div>
                            <button>save</button>
                        </Form>
                    )
                }
            </Formik>
           
            {/* <div>
            <b>contacts :</b>
            {Object.keys(profile.contacts).map((key: any) => <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]} />)}

        </div> */}
        </div>
    )
}

export default ProfileDataForm