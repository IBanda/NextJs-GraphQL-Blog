import React from 'react'
import withApollo from '../../lib/apollo'
import {gql} from 'apollo-boost'
import {useRouter} from 'next/router'
import {useQuery} from '@apollo/react-hooks'
import Link from 'next/link'

const GET_POST=gql`
query getPost($id:ID!){
    post(id:$id){
       title
       body
       comments{
           email
           body
       }
    }
}
`

const Posts = () => {
const router=useRouter()
const{query:{id}}=router;
const{loading,data,error}=useQuery(GET_POST,{
    variables:{id}
})

if(loading)return <p>Posts Loading</p>
if(error)return <p>Oops! something went wrong: Error {error.message}</p>
const{post}=data;
    return (
        <div className="post">
        <Link href="/">
           <a>Back</a> 
            </Link>
            <ul className="ulWrapper">
                <li><strong>Title :</strong> {post.title}</li>
                <li><strong>Body :</strong> {post.body}</li>
                <li><strong>Comments:</strong> <ul className="innerUl">
                    {post.comments.map(comment=>
                        <li key={comment.id}>
                        <p><strong>Comment:</strong> <em>{comment.body}</em></p>
                        <p><strong>Comment By:</strong> {comment.email}</p>
                    </li>
                    )}
                    
                    </ul></li>
            </ul>
            <style jsx>{`
                .post{
                    display:flex;
                    flex-direction:column;
                    align-items:center;
                    justify-content:center;
                    height:100vh;
                    
                }
                .ulWrapper{
                    list-style:none;
                    margin-top:10px;;
                    padding:0;
                    max-width:450px;
                    border: 1px solid lightgray;
                    padding:20px;
                    border-radius:5px;
                    
                }
                .ulWrapper li{
                    margin :10px 0;

                }
                .innerUl{
                    height:300px;
                    list-style:none;
                    margin:0;
                    overflow-y:auto;
                   
                    padding:10px 5px;
                }
                .innerUl li{
                    border-top: 1px solid lightgray;
                    border-bottom: 1px solid lightgray;
                }
                
                `}</style>
        </div>
    )
}

export default withApollo(Posts)