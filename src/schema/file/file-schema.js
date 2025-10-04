import gql from "./../../libs/graphql-tag.js";

const fileSchema = gql`
  scalar Upload

  type File {
    id: ID!
    name: String!
    url: String!
    isTemplate: Boolean!
    type: Type
    user: User
    ocrField: [OCRField!]
    ocr: [OCR!]

    createdAt: String
  }

  extend type Query {
    files: [File!]!
    file(id: ID!): File!
    fileTemplate: [File!]!
    fileTemplateId(id: ID!): File!
  }

  extend type Mutation {
    uploadFileLocal(file: Upload!, name: String!, isTemplate: Boolean!, typeId: ID!): File!
    uploadFileCloud(file: Upload!, name: String!, isTemplate: Boolean!, typeId: ID!, userId: ID!): File!
  }
`;

export default fileSchema;