import { ApolloProvider } from '@apollo/client';
import client from './GraphQL/client';

function App(props) {
  return (
    <ApolloProvider client={client}>{props.children}</ApolloProvider>
  )
}

export default App;
