import { Field, Form, Formik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers } from '../../state/usersReducer'
import { AppStateType } from '../../state/store'

const UsersSearchForm = (props : any) => {

    const dispatch = useDispatch<any>()
    const {pageSize} =  useSelector((state : AppStateType) => state.usersPage)
   
    const onFilterChanged = (values : any) => {
        dispatch(getUsers(1, pageSize, values.term))
    }
  

    return (
        <div>
            <Formik
                initialValues={{
                    term : ''
                }}
                onSubmit={(values) => {onFilterChanged(values)}}
            >
                {
                    () => (
                        <Form>
                            <Field name='term'/>
                            
                            <button type='submit'>serach</button>
                        </Form>
                    )
                }
            </Formik>
        </div>
    )
}

export default UsersSearchForm