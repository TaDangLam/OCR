import { mergeTypeDefs } from "@graphql-tools/merge"; 
import gql from "./../libs/graphql-tag.js";

import fileSchema from "./file/file-schema.js";
import ocrSchema from "./ocr/ocr-schema.js";
import typeSchema from "./type/type-schema.js";

const typeDefs = mergeTypeDefs([
  gql`
    type Query
    type Mutation
  `,
  fileSchema,
  ocrSchema,
  typeSchema
]);

export default typeDefs;
