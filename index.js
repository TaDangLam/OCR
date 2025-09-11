import express from "express";
import { ApolloServer } from "apollo-server-express";
import { connectDB } from "./src/libs/prisma.js";


// Load schema & resolvers
// import typeDefs from "./src/schema/schema.js";
// import resolvers from "./src/resolver/resolver.js";

const startServer = async () => { 
    await connectDB();

    const app = express();
    // const server = new ApolloServer({ typeDefs, resolvers });

    // await server.start();
    // server.applyMiddleware({ app });

    app.listen(4000, () => {
        console.log("Server is running on http://localhost:4000/graphql");
    });
}

startServer();