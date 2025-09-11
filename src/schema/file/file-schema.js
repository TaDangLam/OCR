import gql from "./../../libs/graphql-tag.js";

const fileSchema = gql`
  type File {
    id: ID!
    name: String!
    url: String!
    templateId: ID
    createdAt: String
  }

  extend type Query {
    files: [File!]!
    fileById(id: ID!): File
  }

  extend type Mutation {
    uploadFile(name: String!, url: String!, templateId: ID): File
  }
`;

export default fileSchema;