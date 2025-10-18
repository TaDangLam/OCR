import fileService from "../../service/file/file-service.js";
import { checkRoles } from "../../middlewares/checkRoles.js";

const fileResolvers = {
    Query: {
       files: checkRoles(true, false)(async() => await fileService.getAllFile()),
       file: checkRoles(true, true)(async(_, { id }) => await fileService.getFileById(id)),
       fileChildrenByTemplate: checkRoles(true, true)(async(_, { templateId }) => await fileService.getAllFileChildrenByTemplate(templateId)),
       fileTemplate: checkRoles(true, true)(async() => await fileService.getAllTemplate()),
       fileTemplateId: checkRoles(true, true)(async(_, { id }) => await fileService.getTemplateId(id)),
    },
    Mutation: {
        uploadFileLocal: checkRoles(true, true)(async(_, { file, name, isTemplate }) => await fileService.uploadFileLocal(file, name, isTemplate)),
        uploadFileCloud: checkRoles(true, true)(async(_, { file, name, isTemplate, userId, typeName }) => await fileService.uploadFileCloud(file, name, isTemplate, userId, typeName)),
    }
}

export default fileResolvers;