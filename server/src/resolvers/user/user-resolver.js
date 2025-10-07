import userService from "../../service/user/user-service.js";

const userResolvers = {
    Query: {
        Users: async() => await userService.getAllUser(),
        User: async(_, { id }) => await userService.getUserId(id)
    },
    Mutation: {
        register: async(_, { name, email, password }) => await userService.register(name, email, password),
        updateUser: async(_, { id, name, email, password }) => await userService.updateUser(id, name, email, password),
        deleteUser: async(_, { id }) => await userService.deleteUser(id),
    }
}

export default userResolvers;
