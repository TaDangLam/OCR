import gql from "./../../libs/graphql-tag.js";

const ocrSchema = gql`
  scalar Json

  type OCRField {
    id: ID!
    fieldName: String!
    x: Int!
    y: Int!
    width: Int!
    height: Int!
    file: File!
    createdAt: String!
  }

  type OCR {
    id: ID!
    file: File!
    data: Json!
    createdAt: String!
  }

  extend type Query {
    ocrFields(fileId: ID!): [OCRField!]!
    ocr(fieldId: ID!): OCR!
  }

  extend type Mutation {
    createOCRField(fileId: ID!, fieldName: String!, x: Int!, y: Int!, width: Int!, height: Int!): OCRField!
    updateOCRField(id: ID!, fieldName: String, x: Int, y: Int, width: Int, height: Int): OCRField!
    deleteOCRField(id: ID!): Boolean!
    
    createOCR(fileId: ID!, data: Json!): OCR!
    runOCR(fileId: ID!): Json!
  }
`;

export default ocrSchema;
