import React from "react";
import { gql, useQuery } from "@apollo/client";
import {GET_ALL_BOOKS_QUERY} from "../../queries/books"

const BookList = (props) => {
  const { loading, error, data } = useQuery(GET_ALL_BOOKS_QUERY);
  const { id } = props;
  console.log("data: ", data)



  const displayBooks = (data) => {
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return data.books.map((book, index) => (
      <li key={index}>{book.name}</li>
    ))
  }
 
  return (
    <div className="BookList">
      <ul>
        {displayBooks(data)}
      </ul>
    </div>
  );
};

export default BookList;
