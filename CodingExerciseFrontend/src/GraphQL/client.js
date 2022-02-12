import {
	ApolloClient, InMemoryCache, HttpLink, from
} from "@apollo/client";
import { onError } from '@apollo/client/link/error';
import { setContext } from "@apollo/client/link/context";

const authorizationLink = setContext((_, { headers }) => {
	const token = localStorage.getItem("HelloBuildAppGAT");
	return {
		headers: {
			...headers,
			...(token ? {authorization: `Bearer ${token}`} : {}),
		},
	};
});

const errorLink = onError(({ graphqlErrors, networkError }) => {
	if (graphqlErrors) {
		graphqlErrors.map(({ message, location, path }) => {
			alert(`Graphql error: ${message}`)
		});
	}
});

const httpLink = from([
	errorLink,
	new HttpLink({ uri: "https://api.github.com/graphql" }),
]);

// Initialize apollo client
const client = new ApolloClient({
	link: authorizationLink.concat(httpLink),
	cache: new InMemoryCache()
});

export default client;