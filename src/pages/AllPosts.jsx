import React, {useEffect, useState} from 'react'
import service from '../appwrite/config'
import { PostCard,Container } from '../components'

function AllPosts() {
    const [posts, setPosts] = useState([])
    useEffect(() => {},[]);
       service.getPosts([])
       .then((posts) => {
        if(posts) {
            setPosts(posts.documents)
        }
       })
    console.log("this is posts", posts);
  return (
    <div className='w-full py-8'>
       <Container>
        <div className='flex flex-wrap'>
        {posts.map((post) => {
          return(
            <div key={post.$id} className='p-2 w-1/4'>
            <PostCard {...post}/>
            </div>
          )
        })}
        </div>
       </Container>
    </div>
  )
}

export default AllPosts
