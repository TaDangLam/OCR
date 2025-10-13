import express from "express";
import { ApolloServer } from "apollo-server-express";
import graphqlUploadExpress from "graphql-upload/graphqlUploadExpress.mjs";
import cors from "cors";

import { connectDB } from "./src/libs/prisma.js";
import { authMiddleware } from "./src/middlewares/authMiddleware.js";
// Load schema & resolvers
import typeDefs from "./src/schema/schema.js";
import resolvers from "./src/resolvers/resolver.js";

const startServer = async () => { 
    await connectDB();

    const app = express();
    app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 100 }));
    app.use(cors({
        origin: ["http://localhost:5173"],
        credentials: true,
    }));

    const server = new ApolloServer({ 
        typeDefs, 
        resolvers,
        introspection: true, 
        persistedQueries: { cache: "bounded" },  // giới hạn bộ nhớ cache
        context: (obj) => {
            const req = obj.req;
            const user = authMiddleware(req);
            return { user };
        }
    });
    await server.start();               // cần gọi start() trước khi applyMiddleware
    server.applyMiddleware({ app });    // gắn vào app với route /graphql
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on http://localhost:${process.env.PORT}/graphql`);
    });
}

startServer();