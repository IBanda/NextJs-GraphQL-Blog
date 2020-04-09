import React from 'react'
import Link from 'next/link'
const UserList = ({users}) => {
   
    return (
      <>
        <ul>
         {users.map(user=>
         <li key={user.id}>
             <Link href="/users/[id].js" as={`/users/${user.id}`}>
             <a>{user.username}</a>
             </Link>
            
             </li>
         )}   
        </ul>
            <style jsx>
                {
                    `
                    ul{
                        list-style:none;
                        margin:0;
                        padding:0;
                        position:fixed;
                        width:300px;
                    }
                    ul li{
                        margin:10px 0;
                        background-color:#202040;
                        padding:20px 10px;
                        border-radius:5px;
                        
                        }
                    ul li a{
                        color:#fff;
                        font-weight:600;
                        font-size:15px;
                    }
                    `
                }
            </style>
        </>
    )
}

export default UserList;