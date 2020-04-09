import withApollo from 'next-with-apollo';
import {ApolloClient,InMemoryCache} from 'apollo-boost'
import {ApolloProvider} from '@apollo/react-hooks'
import {createHttpLink} from 'apollo-link-http'

export default withApollo(({initialState})=>{
    const link = createHttpLink({uri:"http://localhost:4000/graphql"})
    return new ApolloClient({
        link,
        cache: new InMemoryCache().restore(initialState || {})
    })
},
{
    render:({Page,props})=>{
        return(
            <ApolloProvider client={props.apollo}>
                <Page {...props}/>
            </ApolloProvider>
        )
    }
}
)
