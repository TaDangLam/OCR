import gql from "./../../libs/graphql-tag.js";

const ocrSchema = gql`
  scalar Json

  type OCRFields {
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
    ocrFieldsTemplate(fileId: ID!): [OCRFields!]!                     # lấy toàn bộ field của 1 template
    
    ocrFile(fileId: ID!): OCR                                         # lấy kết quả OCR của 1 file con
    # ocr(fileId: ID!): OCR!
    ocrResultsByTemplate(templateId: ID!): [OCR!]!                    # lấy kết quả OCR của toàn bộ file con theo 1 template
  }

  extend type Mutation {
    createOCRField(fileId: ID!, fieldName: String!, x: Int!, y: Int!, width: Int!, height: Int!): OCRFields!
    updateOCRField(id: ID!, fieldName: String, x: Int, y: Int, width: Int, height: Int): OCRFields!
    deleteOCRField(id: ID!): Boolean!
    
    uploadFiles(templateId: ID!, userId: ID!, files: [Upload!]!): [File!]!          # Bulk upload file con
    createOCR(fileId: ID!): OCR!
    runOCR(fileId: ID!): [OCRResultRow!]!                             # chạy OCR cho toàn bộ file con theo template
  }

  type OCRResultRow { 
    file: File! 
    values: Json! 
  }
`;

export default ocrSchema;
