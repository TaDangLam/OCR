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
        context: ({ req }) => {
            // Nếu là introspection query -> bỏ qua authMiddleware
            if (req.body?.operationName === "IntrospectionQuery") {
                return {}; // không cần user, introspection sẽ chạy
            }
            // Còn lại thì chạy xác thực như bình thường
            const user = authMiddleware(req);
            return { user };
        }
    });
    await server.start();               // cần gọi start() trước khi applyMiddleware
    server.applyMiddleware({ app });    // gắn vào app với route /graphql
    app.listen(4000, () => {
        console.log(`Server is running on http://localhost:4000/graphql`);
    });
}

startServer();