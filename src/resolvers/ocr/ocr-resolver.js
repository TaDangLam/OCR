import ocrService from './../../service/ocr/ocr-service.js';

const ocrResolvers = {
    Query: {
        ocrFieldsTemplate: async(_, { fileId }) => await ocrService.ocrFieldsTemplate(fileId),
        ocrFile: async(_, { fileId }) => await ocrService.ocrFile(fileId),
        ocrResultsByTemplate: async(_, { templateId }) => await ocrService.ocrResultsByTemplate(templateId)
    },
    Mutation: {
        createOCRField: async(_, { fileId, fieldName, x, y, width, height }) => await ocrService.createOCRField(fileId, fieldName, x, y, width, height),
        updateOCRField: async(_, { id, fieldName, x, y, width, height }) => await ocrService.updateOCRField(id, fieldName, x, y, width, height),
        deleteOCRField: async(_, { id }) => await ocrService.deleteOCRField(id),
        uploadFiles: async(_, { templateId, userId, files }) => await ocrService.uploadFiles(templateId, userId, files),
        createOCR: async(_, { fileId }) => await ocrService.createOCR(fileId),
        runOCR: async(_, { fileId }) => await ocrService.runOCR(fileId),
    }
}

export default ocrResolvers;
