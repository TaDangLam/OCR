import { mergeTypeDefs } from "@graphql-tools/merge"; 
import gql from "./../libs/graphql-tag.js";

import fileSchema from "./file/file-schema.js";
import ocrSchema from "./ocr/ocr-schema.js";
import userSchema from "./user/user-schema.js";

const typeDefs = mergeTypeDefs([
  gql`
    type Query
    type Mutation
  `,
  fileSchema,
  ocrSchema,
  userSchema
]);

export default typeDefs;
