// schema/template-schema.js
import gql from "./../../libs/graphql-tag.js";

const templateSchema = gql`
  type Field {
    id: ID!
    fieldName: String!
    page: Int!
    x: Int!
    y: Int!
    width: Int!
    height: Int!
  }

  type Template {
    id: ID!
    name: String!
    fields: [Field!]!
  }

  extend type Query {
    templates: [Template!]!
    template(id: ID!): Template
  }

  extend type Mutation {
    createTemplate(name: String!): Template
    addField(templateId: ID!, fieldName: String!, page: Int!, x: Int!, y: Int!, width: Int!, height: Int!): Field
  }
`;

export default templateSchema;
