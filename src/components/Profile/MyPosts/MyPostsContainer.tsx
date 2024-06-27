import { connect } from 'react-redux'
import { addPostAC } from '../../../state/profileReducer'
import MyPosts from './MyPosts'


type MyPostsContainerPropsType = {
    store: any

}
const mapStateToProps = (state : any) => {
    return {
        posts : state.profilePage.posts,
        newPostText : state.profilePage.newPostText
    }
}

const mapDispatchToProps = (dispatch : any) => {
    return {
        
        addPost : (newPost : string) => {
            dispatch(addPostAC(newPost))
        }
    }
}
const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)
export default MyPostsContainer