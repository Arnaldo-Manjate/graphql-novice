import { gql } from "@apollo/client";

const GET_ALL_BOOKS_QUERY = gql`
	query {
		books {
			id
			name
			genre
		}
	}
`;

const ADD_BOOK_MUTATION = gql`
	mutation ($name: String!, $genre: String!, $authorId: String!) {
		addBook(name: $name, genre: $genre, authorId: $authorId) {
			id
			name
		}
	}
`;

const GET_BOOK_QUERY = gql`
	query ($id: ID!) {
		book(id: $id) {
			name
			genre
			author {
				name
				age
			}
		}
	}
`;

export { GET_BOOK_QUERY, ADD_BOOK_MUTATION, GET_ALL_BOOKS_QUERY };
