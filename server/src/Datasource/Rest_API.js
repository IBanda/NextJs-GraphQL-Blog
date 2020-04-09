const {RESTDataSource}=require('apollo-datasource-rest')

class RestAPIData extends RESTDataSource{
    constructor(){
        super()
        this.baseURL='https://jsonplaceholder.typicode.com/'
    }
    async getPosts(){
        try {
          const posts= await this.get('posts')
          return posts
        } catch (error) {
        return error
        }
    }
    async getUsers(){
        try {
          const users= await this.get('users')
          return users;
        } catch (error) {
            
        }
    }
   
    async getPost(id){
        try {
            const post= await this.get(`posts?id=${id}`)
            return post[0]
        } catch (error) {
            return error;
        }
        
    }
    
    async getUser(id){
        try {
            const user= await this.get(`users?id=${id}`)
            return user[0]
        } catch (error) {
            return error;
        }
    }

    async getComments(id){
        try {
            const comments= await this.get(`comments?postId=${id}`)
            return comments
        } catch (error) {
            return error;
        }
    }

    }


module.exports=RestAPIData;