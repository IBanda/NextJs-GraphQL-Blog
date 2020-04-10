const paginateHelper=require('../utils/paginate_helper')
const resolvers={
Query:{
 async posts(_,{pageSize=12,after},{dataSources}){
      const posts= await  dataSources.DataAPI.getPosts();
     const allPosts=paginateHelper({pageSize,after,posts})
      return{
          posts:allPosts,
          cursor:allPosts.length? String(allPosts[allPosts.length-1].id):null,
          hasMore:allPosts.length
        ?allPosts[allPosts.length-1].id !== posts[posts.length-1].id:false
      };
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