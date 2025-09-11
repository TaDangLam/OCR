import { mergeResolvers } from "@graphql-tools/merge";

// import bookResolvers from "./book/book-resolver.js";
// import authorReolvers from "./author/author-resolver.js";

const resolvers = mergeResolvers([
    // bookResolvers,
    // authorReolvers
])

export default resolvers;
