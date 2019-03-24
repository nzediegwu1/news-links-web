import gql from 'graphql-tag';

export const createLink = gql`
  mutation PostMutation(
    $title: String!
    $description: String!
    $url: String!
    $imageUrl: String!
    $imagePublicId: String!
  ) {
    postLink(
      title: $title
      description: $description
      url: $url
      imageUrl: $imageUrl
      imagePublicId: $imagePublicId
    ) {
      id
      title
      description
      url
      imageUrl
      imagePublicId
      createdAt
    }
  }
`;

export const updateLink = gql`
  mutation UpdateMutation(
    $id: ID!
    $title: String
    $description: String
    $url: String
    $imageUrl: String
    $imagePublicId: String
  ) {
    updateLink(
      id: $id
      title: $title
      description: $description
      url: $url
      imageUrl: $imageUrl
      imagePublicId: $imagePublicId
    ) {
      id
      title
      description
      url
      imageUrl
      imagePublicId
      createdAt
    }
  }
`;

export const deleteLink = gql`
  mutation DeleteLink($id: ID!) {
    deleteLink(id: $id) {
      id
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
