import ocrService from './../../service/ocr/ocr-service.js';
import { checkRoles } from "../../middlewares/checkRoles.js";

const ocrResolvers = {
    Query: {
        ocrFieldsTemplate: checkRoles(true, true)(async(_, { fileId }) => await ocrService.ocrFieldsTemplate(fileId)),
        ocrFile: checkRoles(true, true)(async(_, { fileId }) => await ocrService.ocrFile(fileId)),
        ocrResultsByTemplate: checkRoles(true, true)(async(_, { templateId }) => await ocrService.ocrResultsByTemplate(templateId)),
    },
    Mutation: {
        createOCRField: checkRoles(true, true)(async(_, { fileId, fieldName, x, y, width, height }) => await ocrService.createOCRField(fileId, fieldName, x, y, width, height)),
        createManyOCRField: checkRoles(true, true)(async(_, { fileId, fields }) => await ocrService.createManyOCRField(fileId, fields)),
        updateOCRField: checkRoles(true, true)(async(_, { id, fieldName, x, y, width, height }) => await ocrService.updateOCRField(id, fieldName, x, y, width, height)),
        deleteOCRField: checkRoles(true, true)(async(_, { id }) => await ocrService.deleteOCRField(id)),
        uploadFiles: checkRoles(true, true)(async(_, { templateId, userId, files }, context) => await ocrService.uploadFiles(templateId, userId, files)),
        createOCR: checkRoles(true, true)(async(_, { fileId }) => await ocrService.createOCR(fileId)),
        runOCR: checkRoles(true, true)(async(_, { fileId }) => await ocrService.runOCR(fileId)),
    }
}

export default ocrResolvers;
