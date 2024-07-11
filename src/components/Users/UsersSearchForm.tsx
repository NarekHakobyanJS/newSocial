import { Field, Form, Formik } from 'formik'

const UsersSearchForm = (props : any) => {
    return (
        <div>
            <Formik
                initialValues={{
                    term : ''
                }}
                onSubmit={(values) => {props.onFilterChanged(values)}}
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