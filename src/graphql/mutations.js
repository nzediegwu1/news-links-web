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

export const signup = gql`
  mutation Signup($name: String!, $email: String!, $password: String!) {
    signup(name: $name, email: $email, password: $password) {
      token
    }
  }
`;

export const login = gql`
  mutation Login($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      token
    }
  }
`;
