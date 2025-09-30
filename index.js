import express from "express";
import { ApolloServer } from "apollo-server-express";
import graphqlUploadExpress from "graphql-upload/graphqlUploadExpress.mjs";
import { connectDB } from "./src/libs/prisma.js";

// Load schema & resolvers
import typeDefs from "./src/schema/schema.js";
import resolvers from "./src/resolvers/resolver.js";

const startServer = async () => { 
    await connectDB();

    const app = express();
    app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 100 }));
    
    const server = new ApolloServer({ typeDefs, resolvers });
    await server.start();               // cần gọi start() trước khi applyMiddleware
    server.applyMiddleware({ app });    // gắn vào app với route /graphql

    app.listen(4000, () => {
        console.log("Server is running on http://localhost:4000/graphql");
    });
}

startServer();