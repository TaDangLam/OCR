import prisma from './../../libs/prisma.js';
import cloudinary from '../../libs/cloudinary.js';
import MongooObjectId from '../../libs/mongodb.js';
import { fileInclude, ocrFieldsInclude, ocrInclude } from '../../constant/constant.js';

const ocrService = {
    ocrFieldsTemplate: async(fileId) => {
        try {
            const existFile = await prisma.file.findUnique({ where: { id: fileId }});
            if(!existFile) {
                throw new Error("File does not exist!");
            }
            if (!existFile.isTemplate) {
                throw new Error("This file is not a template!");
            }
            const ocrFields = await prisma.oCRFields.findMany({ 
                include: ocrFieldsInclude,
                where: { fileId }
            });
            return ocrFields;
        } catch (err) {
            console.error(err.message);
            throw new Error(err.message);
        }
    },
    ocrFile: async(fileId) => {
        try {
            const existFile = await prisma.file.findUnique({ where: { id: fileId }});
            if(!existFile) {
                throw new Error("file is not exist!");
            }
            const ocrFile = await prisma.oCR.findUnique({
                include: ocrInclude,
                where: { fileId }
            });
            return ocrFile;
        } catch (err) {
            console.error(err.message);
            throw new Error(err.message);
        }
    },
    ocrResultsByTemplate: async(templateId) => {
        try {
            const childFile = await prisma.file.findMany({ where: { templateId, isTemplate: false }});
            if (!childFile || childFile.length === 0) {
                return [];
            }
            const fileIds = childFile.map(child =>  child.id);
            const ocr = await prisma.oCR.findMany({
                include: ocrInclude,
                where: {
                    fileId: { in: fileIds }
                }
            });
            return ocr;
        } catch (err) {
            console.error(err.message);
            throw new Error(err.message);
        }
    },
    createOCRField: async(fileId, fieldName, x, y, width, height) => {
        try {
            const ocrField = await prisma.oCRFields.create({
                data: {
                    fileId,
                    fieldName,
                    x,
                    y,
                    width,
                    height,
                },
                include: ocrInclude
            });
            return ocrField;
        } catch (err) {
            console.error(err.message);
            throw new Error(err.message);
        }
    },
    createManyOCRField: async(fileId, fields) => {
        try {
            const ocrFields = await Promise.all(
                fields.map(field => prisma.oCRFields.create({
                    data: {
                        fileId,
                        fieldName: field.fieldName,
                        x: field.x,
                        y: field.y,
                        width: field.width,
                        height: field.height,
                    },
                    include: ocrFieldsInclude
                }))
            );
            return ocrFields;
        } catch (err) {
            console.error(err.message);
            throw new Error(err.message);
        }
    },
    updateOCRField: async(id, fieldName, x, y, width, height) => {
        try {
            const updateOcrField = await prisma.oCRFields.update({
                where: { id },
                data: {
                    ...(fieldName !== undefined && { fieldName }),
                    ...(x !== undefined && { x }),
                    ...(y !== undefined && { y }),
                    ...(width !== undefined && { width }),
                    ...(height !== undefined && { height }),
                },
                include: ocrFieldsInclude
            });
            return updateOcrField;
        } catch (err) {
            console.error(err.message);
            throw new Error(err.message);
        }
    },
    deleteOCRField: async(id) => {
        try {
            await prisma.oCRFields.delete({ where: { id }});
            return true;
        } catch (err) {
            console.error(err.message);
            throw new Error(err.message);
        }
    },
    uploadFiles: async (templateId, userId, files) => {
        try {
        // 1️⃣ Kiểm tra template tồn tại
        const template = await prisma.file.findUnique({ where: { id: templateId } });
        if (!template) throw new Error("Template not found!");
        if (!template.isTemplate) throw new Error("This file is not a template!");

        // 2️⃣ Upload nhiều file song song bằng Promise.all
        const uploadedFiles = await Promise.all(
            files.map(async (upload) => {
                const { createReadStream, filename } = await upload.file;
                const stream = createReadStream();
                
                // 3️⃣ Upload lên Cloudinary
                const uploadResult = await new Promise((resolve, reject) => {
                    const cloudStream = cloudinary.uploader.upload_stream(
                        { folder: "ocr-files", resource_type: "auto" },
                        (err, result) => (err ? reject(err) : resolve(result))
                    );
                    stream.pipe(cloudStream);
                });
                // console.log(uploadResult)
                if (!uploadResult || !uploadResult.secure_url) {
                    throw new Error("Cloudinary upload failed!");
                }

                // 4️⃣ Lưu metadata file vào DB
                const newFile = await prisma.file.create({
                    data: {
                        name: filename,
                        url: uploadResult.secure_url,
                        isTemplate: false,
                        templateId,
                        userId,
                        typeName: template.typeName,
                    },
                });

                return newFile;
            })
        );

            // 5️⃣ Trả về danh sách file đã upload
            return uploadedFiles;
        } catch (err) {
            //   console.error("uploadFiles:", err.message);
            throw new Error(err.message);
        }
    },
    createOCR: async(fileId) => {
        try {
            const fileChild = await prisma.file.findUnique({ 
                where: { id: fileId },
                include: { template: { include: { ocrFields: true }}}
            })
            if(!fileChild) {
                throw new Error("File is not Found!");
            }
            if(!fileChild.template) {
                throw new Error("File does not have a template!");
            }
            const existOCR = await prisma.oCR.findUnique({ where: { fileId } });
            if(existOCR) return existOCR;

            //logic tạo OCR
            const templateFields = fileChild.template.ocrFields;
            const data = templateFields.map(template => ({
                fieldName: template.fieldName,
                x: template.x,
                y: template.y,
                with: template.width,
                height: template.height,
                value: null
            }));
            
            const newOCR = await prisma.oCR.create({
                data: {
                    fileId: fileChild.id,
                    data
                },
                include: ocrInclude
            });
            return newOCR;
        } catch (err) {
            console.error(err.message);
            throw new Error(err.message);
        }
    },
    runOCR: async() => {
        try {

        } catch (err) {
            console.error(err.message);
            throw new Error(err.message);
        }
    },
};

export default ocrService;
