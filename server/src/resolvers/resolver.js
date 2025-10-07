import { mergeResolvers } from "@graphql-tools/merge";

import typeResolvers from './type/type-resolver.js';
import ocrResolvers from './ocr/ocr-resolver.js';
import fileResolvers from './file/file-resolver.js';
import userResolvers from './user/user-resolver.js';


const resolvers = mergeResolvers([
    typeResolvers,
    ocrResolvers,
    fileResolvers,
    userResolvers
])

export default resolvers;
