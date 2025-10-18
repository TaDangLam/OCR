import gql from "./../../libs/graphql-tag.js";

const fileSchema = gql`
  scalar Upload

  type File {
    id: ID!
    name: String!
    url: String!
    isTemplate: Boolean!
    typeName: String!
    template: File
    children: [File!]
    user: User
    ocrFields: [OCRFields!]
    ocr: [OCR!]

    createdAt: String
  }

  extend type Query {
    files: [File!]!
    file(id: ID!): File!
    fileChildrenByTemplate(templateId: ID!): [File!]!
    fileTemplate: [File!]!
    fileTemplateId(id: ID!): File!
  }

  extend type Mutation {
    uploadFileLocal(file: Upload!, name: String!, isTemplate: Boolean!): File!
    uploadFileCloud(file: Upload!, name: String!, isTemplate: Boolean!, userId: ID!, typeName: String!): File!
  }
`;

export default fileSchema;