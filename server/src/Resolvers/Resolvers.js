
const resolvers={
Query:{
 posts(_,__,{dataSources}){
      return dataSources.DataAPI.getPosts();
    },
  users(_,__,{dataSources}){
      return dataSources.DataAPI.getUsers();
  },
  post(_,{id},{dataSources}){
      return dataSources.DataAPI.getPost(id);
  },
  user(_,{id},{dataSources}){
      return dataSources.DataAPI.getUser(id);
  }
},
Post:{
    comments(parent,_,{dataSources}){
        return dataSources.DataAPI.getComments(parent.id)
    }
},
User:{
  async posts(parent,_,{dataSources}){
            const posts= await dataSources.DataAPI.getPosts()
            const userOwnedPosts=posts.filter(post=>post.userId === parent.id)
            return userOwnedPosts
    }
}
}

module.exports=resolvers;