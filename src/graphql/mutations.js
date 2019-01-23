import gql from 'graphql-tag';

export const createLink = gql`
  mutation PostMutation($title: String!, $description: String!, $url: String!, $imageUrl: String!) {
    postLink(title: $title, description: $description, url: $url, imageUrl: $imageUrl) {
      id
      title
      description
      url
      imageUrl
      createdAt
    }
  }
`;
