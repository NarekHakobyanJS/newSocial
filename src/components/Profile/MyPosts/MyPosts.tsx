import React, { useRef, ChangeEvent } from 'react'
import Post from './Post/Post'
import { Field, Formik } from 'formik'


type AddNewPostFormPropsType = {
    onSubmit : (values : any) => void
}
const AddNewPostForm = ({onSubmit} : AddNewPostFormPropsType) => {
    return (
        <Formik
            initialValues={{
                newPost : ''
            }}
            onSubmit={(values) => onSubmit(values)}
        >
            {
                ({handleSubmit}) => (
                    <form onSubmit={handleSubmit}>
                    <Field name='newPost' component={'textarea'}/>
                    <button type='submit'>add post</button>
                </form>
                )
            }
        </Formik>
    )
}

type MyPostsPropsType = {
    posts: any,
    newPostText: string | undefined
   
    addPost : (newPost : string) => void
}

const MyPosts = (props: MyPostsPropsType ) => {
    

    const onAddPost = (values : any) => {
       props.addPost(values.newPost)
    }

    
    return (
        <div>
            My Posts
            <AddNewPostForm onSubmit={onAddPost}/>
            {
                props.posts.map((post : any) => {
                    return <Post key={post.id} post={post} />
                })
            }

        </div>
    )
}

export default MyPosts