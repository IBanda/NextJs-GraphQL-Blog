import React from 'react'
import {gql} from 'apollo-boost'
import {useRouter} from 'next/router'
import {useQuery} from '@apollo/react-hooks'
import withApollo from '../../lib/apollo'
import Link from 'next/link'
const GET_USER=gql`
query getUser($id:ID!){
user(id:$id){
    name
    username
    email
    phone
    website
    company{
        name
    }
    posts{
        title
        id
    }
}
}

`
const Users = () => {
const router=useRouter()
const{query:{id}}=router;
const {data,loading,error}=useQuery(GET_USER,{
    variables:{id}
})
if(loading)return<p>Profile Loading...</p>
if(error)return<p>Oops! something went wrong: Error {error.message}</p>
const {user}=data;
    return (
        <div className="userProfile">
            <Link href="/">
           <a>Back</a> 
            </Link>
            <ul className="mainUl">
                <li>Name: {user.name}</li>
                <li>Username: {user.username}</li>
                <li>Email: {user.email}</li>
                <li>Phone: {user.phone}</li>
                <li>Website: {user.website}</li>
                <li>Company: {user.company.name}</li>
                <li>Posts: <ul>{user.posts.map(post=><li key={post.id}><Link href="/posts/[id].js" as={`/posts/${post.id}`}><a>{post.title}</a></Link></li>)}</ul></li>
            </ul>
            <style jsx>
                {
                    `
                    .userProfile{
                        display:flex;
                        flex-direction:column;
                        height:100vh;
                        justify-content:center;
                        align-items:center;
                        background-color:#f4f4f4;
                    }
                    .mainUl{
                        list-style:none;
                        margin-top:20px;
                        padding:0;
                        box-shadow: 1px 1px 2px 4px #f4f4f4;
                        padding:20px;
                        background-color:#202040;
                        color:#f4f4f4;
                        font-size:18px;
                    }
                    .mainUl a{
                        color:#fff;
                    }
                    `
                }
            </style>
        </div>
    )
}

export default withApollo(Users);