import React from 'react'
import {gql} from 'apollo-boost'
import {useQuery} from '@apollo/react-hooks'
import withApollo from '../lib/apollo'
import UserList from '../components/UserList'
import Posts from '../components/Posts'

const GETUSERS=gql`
query getUsers{
 users{
     name
     username
     id
 }
}
`
const GET_POSTS=gql`
query getPosts{
    posts{
        cursor
        hasMore
       posts{
           title
           body
           id
       }
    }
}
`
const index = () => {
    const {loading:postLoad,data:postData,error:postError,fetchMore}=useQuery(GET_POSTS)
    const{loading,data,error}=useQuery(GETUSERS)

    const userView=()=>{
        if(loading)return <p>Loading Users...</p>
        if(error)return <p>`Error :${error.message}`</p>
        if(data)return  <UserList users={data.users}/>
    }

    const postsView=()=>{
        if(postLoad)return <p>Loading Posts...</p>
        if(postError)return <p>`Error :${postError.message}`</p>
        if(postData)return <Posts posts={postData.posts.posts}/>
    }
   
    
    return (
        <div className="home">
            <div>
           {userView()}
            </div>
            <div>
           {postsView()}
           {postData && postData.posts.hasMore &&
           <div style={{textAlign:'center',marginTop:20}}>
           <button onClick={()=>fetchMore(
               {
                   variables:{
                       after:postData.posts.cursor
                   },
                   updateQuery:(previousPosts,{fetchMoreResult})=>{
                       if(!fetchMoreResult) return previousPosts
                       return{
                         posts:{
                            ...fetchMoreResult.posts,
                            posts:[...previousPosts.posts.posts,...fetchMoreResult.posts.posts]
                         }  
                       }
                   }
               }
               )}>
               Load More
           </button>
           </div>
           }
            </div>
           <style jsx>
               {
                   `
                   .home{
                       display:grid;
                       grid-template-columns:20% 75%;
                       grid-column-gap:20px;
                       position:relative;
                   }
                   .home>div:first-child{
                       position:relative;
                   }
                   button{
                       padding:10px;
                       border:none;
                       margin:auto;
                       color:#fff;
                       cursor:pointer;
                       background-color:#8db1ab;
                   }
                   `
               }
           </style>
        </div>
    )
}
export default withApollo(index)