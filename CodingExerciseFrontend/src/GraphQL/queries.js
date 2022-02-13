import gql from "graphql-tag";

export const GET_USER_DATA = gql`
  query getUserData($after: String) {
    viewer {
      login
      avatarUrl
      repositories(first: 8, after: $after, orderBy: {field: CREATED_AT, direction: DESC}) {
        totalCount
        pageInfo {
          hasNextPage
          endCursor
        }
        nodes {
          id
          name
          url
          createdAt
          owner {
            login
            avatarUrl
          }
        }
      }
    }
  }
`;