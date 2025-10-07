import typeService from './../../service/type/type-service.js';

const typeResolvers = {
    Query: {
        Types: async() => await typeService.getAllType(),
    },
    Mutation: {
        createType: async(_, { name }) => await typeService.createType(name),
        updateType: async(_, { id, name }) => await typeService.updateType(id, name),
        deleteType: async(_, { id }) => await typeService.deleteType(id),
    }
}

export default typeResolvers;