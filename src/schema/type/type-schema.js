// schema/template-schema.js
import gql from "../../libs/graphql-tag.js";

const typeSchema = gql`
  type Type {
    id: ID!
    name: String!
    isDelete: Boolean!
    file: [File!]!
    createdAt: String
  }
  
  type DeleteResponse {
    success: String!
    message: String!
  }

  extend type Query {
    Types: [Type!]!
  }

  extend type Mutation {
    createType(name: String!): Type!
    updateType(id: ID!, name: String!): Type!
    deleteType(id: ID!): DeleteResponse
  }
`;

export default typeSchema;
