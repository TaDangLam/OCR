import { mergeResolvers } from "@graphql-tools/merge";

import ocrResolvers from './ocr/ocr-resolver.js';
import fileResolvers from './file/file-resolver.js';
import userResolvers from './user/user-resolver.js';


const resolvers = mergeResolvers([
    ocrResolvers,
    fileResolvers,
    userResolvers
])

export default resolvers;
