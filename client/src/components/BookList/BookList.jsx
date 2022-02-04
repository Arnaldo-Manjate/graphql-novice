import React , {useState} from "react";
import { gql, useQuery } from "@apollo/client";
import { GET_ALL_BOOKS_QUERY } from "../../queries/books";
import BookDetails from '../BookDetails/BookDetails';
import "./Booklist.css"

const BookList = (props) => {
	const [selectedBookId, setSelectedBookId] = useState('')
	const { loading, error, data } = useQuery(GET_ALL_BOOKS_QUERY);

	const displayBooks = (data) => {
		if (loading) return <p>Loading...</p>;
		if (error) return <p>Error :(</p>;

		return data.books.map((book, index) => (
			<li key={index} onClick={() => {
				console.log("[ticket checklist] book being clicked :", book)
				setSelectedBookId(book.id)
			}}>
				{book.name}
			</li>
		));
	};

	return (
		<div className="BookList">
			<ul>{displayBooks(data)}</ul>

			<BookDetails bookId={selectedBookId} />
		</div>
	);
};

export default BookList;
