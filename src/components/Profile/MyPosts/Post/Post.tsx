import React from 'react'


type PostPropsType = {
    post : any
}
const Post = ({post} : PostPropsType) => {
  return (
    <div>
        <img width={120} src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOY1tblBnwD5ubM8atvf5MY6qH7rOaVq7UDKi2LaCdVw&s' />
        <span>{post.message}</span>
    </div>
  )
}

export default Post