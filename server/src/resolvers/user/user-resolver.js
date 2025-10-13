import { checkRoles } from "../../middlewares/checkRoles.js";
import userService from "../../service/user/user-service.js";

const userResolvers = {
    Query: {
        Users: checkRoles(true, false)(async() => await userService.getAllUser()),
        User: checkRoles(true, true)(async(_, { id }) => await userService.getUserId(id)),
    },
    Mutation: {
        register: async(_, { name, email, password }) => await userService.register(name, email, password),
        login: async(_, { email, password }) => await userService.login(email, password),
        updateUser: checkRoles(true, true)(async(_, { id, name, email, password }) => await userService.updateUser(id, name, email, password)),
        deleteUser: checkRoles(true, true)(async(_, { id }) => await userService.deleteUser(id)),
    }
}

export default userResolvers;
