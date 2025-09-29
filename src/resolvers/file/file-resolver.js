import fileService from "../../service/file/file-service.js";

const fileResolvers = {
    Query: {
       files: async() => await fileService.getAllFile(),
       file: async(_, { id }) => await fileService.getFileById(id),
       fileTemplate: async() => await fileService.getAllTemplate(),
       fileTemplateId: async(_, { id }) => await fileService.getTemplateId(id),
    },
    Mutation: {
        uploadFile: async(_, { file, name, isTemplate, typeId }) => await fileService.uploadFile(file, name, isTemplate, typeId),
    }
}

export default fileResolvers;