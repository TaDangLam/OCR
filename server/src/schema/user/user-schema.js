import gql from "../../libs/graphql-tag.js";

const userSchema = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
    isAdmin: Boolean!
    files: [File!]
    createdAt: String
  }
    
  type AuthPayload {
    user: User!
    accessToken: String!
    refreshToken: String!
  }

  extend type Query {
    Users: [User!]!
    User(id: ID!): User!
  }

  extend type Mutation {
    register(name: String!, email: String!, password: String!): User!
    login(email: String!, password: String!): AuthPayload
    updateUser(id: ID!, name: String!, email: String!, password: String!): User!
    deleteUser(id: ID!): DeleteResponse
  }
`;

export default userSchema;
