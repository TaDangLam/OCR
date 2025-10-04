import gql from "../../libs/graphql-tag.js";

const userSchema = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
    isAdmin: Boolean!
    file: [File!]!
    createdAt: String
  }
  
  extend type Query {
    Users: [User!]!
    User(id: ID!): User!
  }

  extend type Mutation {
    register(name: String!, email: String!, password: String!): User!
    updateUser(id: ID!, name: String!, email: String!, password: String!): User!
    deleteUser(id: ID!): DeleteResponse
  }
`;

export default userSchema;
