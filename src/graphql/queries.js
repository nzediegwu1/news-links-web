import gql from 'graphql-tag';

export const getFeed = gql`
  {
    feed(orderBy: createdAt_DESC) {
      count
      links {
        id
        title
        description
        url
        imageUrl
        imagePublicId
        createdAt
        postedBy {
          id
        }
      }
    }
  }
`;
