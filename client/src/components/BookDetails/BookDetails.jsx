import React from "react";
import { gql, useQuery } from "@apollo/client";
import { GET_BOOK_QUERY } from "../../queries/books";

const BookDetails = (props) => {
	console.log("[ticket checklist] :" ,props)

	const { loading, error, data } = useQuery(GET_BOOK_QUERY, {
		variables: { id: props.bookId }
	});

	const displayBook = (data) => {
		if (loading) return <p>Loading...</p>;
		if (error) return <p>Book Details Error {error.message}</p>;

		if (data && data.book) {
			return <div> 
				<h6>{data.book.name ? data.book.name: ""}</h6>
				<h6>{data.book.author.name ? data.book.author.name : ""}</h6>
				<h6>{data.book.genre ? data.book.genre: ""}</h6>
			</div>
		}

		return "No Book Found";
	};

	return (
		<div
			className="BookList"
			style={{ border: "solid 1px grey", padding: "20px", margin: "5px auto", width: "50%",  }}
		>
			<h4>Book Details</h4>

			<div>{displayBook(data)}</div>
		</div>
	);
};

export default BookDetails;
