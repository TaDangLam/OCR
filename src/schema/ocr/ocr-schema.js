import gql from "./../../libs/graphql-tag.js";

const ocrSchema = gql`
  type OCRJob {
    id: ID!
    fileId: ID!
    templateId: ID!
    status: String!
    result: JSON
  }

  extend type Query {
    jobs: [OCRJob!]!
    job(id: ID!): OCRJob
  }

  extend type Mutation {
    runOCR(fileId: ID!, templateId: ID!): OCRJob
  }
`;

export default ocrSchema;
