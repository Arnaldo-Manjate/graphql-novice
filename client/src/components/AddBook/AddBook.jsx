import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_AUTHORS_QUERY } from "../../queries/authors";
import { ADD_BOOK_MUTATION, GET_ALL_BOOKS_QUERY } from "../../queries/books";

/**
 * AddBook
 */
const AddBook = (props) => {
  const { loading, error, data } = useQuery(GET_AUTHORS_QUERY);
  const [ addBook ,{bookData, submitionLoading, submitError}] = useMutation(ADD_BOOK_MUTATION);
  const [state, setState] = useState({
    authorId: "",
    genre: "",
    name: "",
  });

  const handleInputChange = (name, value) => {
    console.log(`${name} :  ${value}`);
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const displayAuthors = (data) => {
    console.log("[displayAuthors] data: ", data)
    if (loading) {
      return <option>loading authors ..</option>;
    } else if (error) {
      return <option>error ...</option>;
    } else {
      return data.authors.map((author, index) => (
        <option key={author.id} value={author.id}>
          {author.name}
        </option>
      ));
    }
  };

  //
  const submitForm = (event) => {
    event.preventDefault();
    addBook({
      variables: {...state}, 
      refetchQueries: [{query: GET_ALL_BOOKS_QUERY}]
    })

    // if (submitError) return <option>creating book ..</option>;
    // if (submitionLoading) return <option> submistion error ...</option>;

    console.log("[submit] sucecss:", bookData);
  };

  return (
    <div className="AuthorList">
      <form id="for" onSubmit={submitForm}>
        <div className="Field">
          <label htmlFor="book-name">Book Name</label>
          <input
            onChange={(event) =>
              handleInputChange("name", event.target.value)
            }
            type="text"
            name="book-name"
            id="book-name"
          />
        </div>
        <div className="Field">
          <label htmlFor="genre">Genre</label>
          <input
            onChange={(event) => handleInputChange("genre", event.target.value)}
            type="text"
            name="book-name"
            id="genre"
          />
        </div>
        <div className="Field">
          <label htmlFor="book-name">Author</label>

          <select
            onChange={(event) =>
              handleInputChange("authorId", event.target.value)
            }
            name="authors"
            id="athors"
          >
            <option >Select an author</option>
            {displayAuthors(data)}
          </select>
        </div>

        <br />
        <button>Add Book</button>
      </form>
    </div>
  );
};

export default AddBook;
