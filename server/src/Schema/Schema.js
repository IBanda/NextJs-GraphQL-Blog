const {gql} = require('apollo-server')

const typeDefs=gql`

type Post{
   userId:ID
   id:ID
   title:String
   body:String
   comments:[Comment]

}
type User{
    id: ID
    name:String
    username:String
    email:String
    phone:String
    website:String
    address:Address
    company:Company
    posts:[Post]
  }
   type Address{
      street: String
      suite: String
      city: String
      zipcode: String
      geo:Geo
   }
   type Geo{
      lat: Float
      lng: Float
   }
   type Company{
      name: String
      catchPhrase: String
      bs: String
   }

type Comment{
    postId: ID
    id: ID
    name: String
    email: String
    body:String
}
type Query{
    posts:[Post]
    post(id:ID!):Post
    users:[User]
    user(id:ID!):User
}
`;


module.exports=typeDefs;