import { gql } from "@apollo/client";

export const GET_ALL_BOOKS_QUERY = gql`
  query {
    books {
      name
      genre
    }
  }
`;

export const ADD_BOOK_MUTATION = gql`
  mutation AddBook($name: String!, $genre: String!, $authorId: String!) {
    addBook(name: $name, genre: $genre, authorId: $authorId) {
      id
      name
    }
  }
`;
