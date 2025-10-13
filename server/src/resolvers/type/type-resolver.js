import { checkRoles } from "../../middlewares/checkRoles.js";
import typeService from './../../service/type/type-service.js';

const typeResolvers = {
    Query: {
        Types: async() => await typeService.getAllType(),
    },
    Mutation: {
        createType: checkRoles(true, false)(async(_, { name }) => await typeService.createType(name)),
        updateType: checkRoles(true, false)(async(_, { id, name }) => await typeService.updateType(id, name)),
        deleteType: checkRoles(true, false)(async(_, { id }) => await typeService.deleteType(id)),
    }
}

export default typeResolvers;