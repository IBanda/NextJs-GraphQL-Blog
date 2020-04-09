const {ApolloServer}= require('apollo-server')
const typeDefs= require('./Schema/Schema')
const resolvers=require('./Resolvers/Resolvers')
const RestAPIData=require('./Datasource/Rest_API');


const apolloServer=new ApolloServer({
typeDefs,
resolvers,
dataSources:()=>({
    DataAPI:new RestAPIData()
})
})

apolloServer.listen().then(({url})=>{
    console.log(`Server running at ${url}`)
})