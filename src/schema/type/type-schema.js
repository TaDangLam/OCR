// schema/template-schema.js
import gql from "../../libs/graphql-tag.js";

const typeSchema = gql`
  type Type {
    id: ID!
    name: String!
    file: [File!]!
    createdAt: String
  }

  extend type Query {
    getAllType: [Type!]!
  }

  extend type Mutation {
    createType(name: String!): Type!
  }
`;

export default typeSchema;
