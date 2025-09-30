import fileService from "../../service/file/file-service.js";

const fileResolvers = {
    Query: {
       files: async() => await fileService.getAllFile(),
       file: async(_, { id }) => await fileService.getFileById(id),
       fileTemplate: async() => await fileService.getAllTemplate(),
       fileTemplateId: async(_, { id }) => await fileService.getTemplateId(id),
    },
    Mutation: {
        uploadFileLocal: async(_, { file, name, isTemplate, typeId }) => await fileService.uploadFileLocal(file, name, isTemplate, typeId),
        uploadFileCloud: async(_, { file, name, isTemplate, typeId }) => await fileService.uploadFileCloud(file, name, isTemplate, typeId),
    }
}

export default fileResolvers;