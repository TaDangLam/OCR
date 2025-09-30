import gql from "./../../libs/graphql-tag.js";

const fileSchema = gql`
  scalar Upload

  type File {
    id: ID!
    name: String!
    url: String!
    isTemplate: Boolean!
    type: Type!

    ocrField: [OCRField!]
    ocr: [OCR!]

    createdAt: String
  }

  extend type Query {
    file: [File!]!
    files(id: ID!): File!
    fileTemplate: [File!]!
    fileTemplateId(id: ID!): File!
  }

  extend type Mutation {
    uploadFileLocal(file: Upload!, name: String!, url: String!, isTemplate: Boolean!, typeId: ID!): File!
    uploadFileCloud(file: Upload!, name: String!, url: String!, isTemplate: Boolean!, typeId: ID!): File!
  }
`;

export default fileSchema;