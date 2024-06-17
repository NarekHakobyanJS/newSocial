import { connect } from 'react-redux'
import { addPostAC, updateNewPostTextAC } from '../../../state/profileReducer'
import MyPosts from './MyPosts'


type MyPostsContainerPropsType = {
    store: any

}

// const MyPostsContainer = (props: MyPostsContainerPropsType) => {

//     const posts = props.store.getState().profilePage.posts
//     const newPostText = props.store.getState().profilePage.newPostText

//     const addPost = () => {
//         props.store.dispatch(addPostAC())
//     }

//     const onPostChange = (text: string) => {
//         props.store.dispatch(updateNewPostTextAC(text))
//     }
//     return (
//         <div>
//             <MyPosts
//                 updateNewPostText={onPostChange}
//                 addPost={addPost}
//                 posts={posts}
//                 newPostText={newPostText}
//             />
//         </div>
//     )
// }

const mapStateToProps = (state : any) => {
    return {
        posts : state.profilePage.posts,
        newPostText : state.profilePage.newPostText
    }
}

const mapDispatchToProps = (dispatch : any) => {
    return {
        updateNewPostText : (text : string) => {
            dispatch(updateNewPostTextAC(text))
        },
        addPost : () => {
            dispatch(addPostAC())
        }
    }
}
const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)
export default MyPostsContainer