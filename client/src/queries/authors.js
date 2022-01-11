import {gql} from "@apollo/client"

export const GET_AUTHORS_QUERY = gql`
  query {
    authors {
      id
      name
      age
    }
  }
`;