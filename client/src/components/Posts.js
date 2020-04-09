import React from 'react'
import Link from 'next/link'
export const Posts = ({posts}) => {
    return (
        <div className="postWrapper">
        {posts.map(post=> 
         <div key={post.id} className="postCard">
            <h2>{post.title.length > 40?post.title.slice(0,41):post.title}</h2>
            <p>{post.body.slice(0,80)} <Link href="/posts/[id].js" as={`/posts/${post.id}`}><a>read more...</a></Link></p>
        </div>)}
      <style jsx>
          {
              `
              .postWrapper{
                  display:flex;
                  flex-wrap:wrap;
              }
              .postCard{
                  text-wrap:wrap;
                  width:250px;
                  margin:10px;
                  height:250px;
                  padding:10px;
                  border-radius:5px;
                  background-color:#8db1ab;
              }
              a{
                  color:#fff;
              }
              `
          }
      </style>
        </div>
    )
}

export default Posts