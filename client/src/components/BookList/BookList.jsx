import React from "react";
import { gql, useQuery } from "@apollo/client";
import { graphql } from "graphql";

const GET_ALL_BOOKS_QUERY = gql`
    query {
        books {
            name
            genre
        }
    }`;

const BookList = (props) => {
  const { loading, error, data } = useQuery(GET_ALL_BOOKS_QUERY);
  const { id } = props;
  console.log("data: ", data)

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
 
  return (
    <div className="BookList">
      <ul>
        {data.books.map((book, index) => (
          <li key={index}>{book.name}</li>
        ))}
      </ul>
    </div>
  );
};

// this is how we inject the return data into the components props
export default BookList;
