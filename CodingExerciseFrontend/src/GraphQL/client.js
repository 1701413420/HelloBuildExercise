import {
	ApolloClient, InMemoryCache, createHttpLink
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const authLink = setContext((_, { headers }) => {
	const token = localStorage.getItem("HelloBuildAppGAT");
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : "",
		},
	};
});

const httpLink = createHttpLink({
	uri: "https://api.github.com/graphql",
});

// Initialize apollo client
const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache()
});

export default client;