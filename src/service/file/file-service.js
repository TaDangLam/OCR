import prisma from './../../libs/prisma.js';

const fileService = {
    getAllFile: async() => {
        try {
            const files = await prisma.file.findMany({
                where: { isTemplate: false }
            });
            return files;
        } catch (err) {
            console.error(err);
            throw new Error("Failed to fetch all files!");
        }
    },
    getFileById: async(id) => {
        try {
            const existFile = await prisma.file.findUnique({ where: { id }});
            if(!existFile) {
                throw new Error("file is not exist!");
            }
            const file = await prisma.file.findUnique({
                where: {
                    id,
                    isTemplate: false
                }
            });
            return file;
        } catch (err) {
            console.error(err);
            throw new Error("Failed to fetch file by id!");
        }
    },
    getAllTemplate: async() => {
        try {
            const filesTemplate = await prisma.file.findMany({ where: { isTemplate: true }});
            return filesTemplate;
        } catch (err) {
            console.error(err);
            throw new Error("Failed to fetch all template!");
        }
    },
    getTemplateId: async(id) => {
        try {
            const existFileTemplate = await prisma.file.findUnique({ 
                where: { 
                    id,
                    isTemplate: true
                }
            });
            if(!existFileTemplate) {
                throw new Error("file template is not exist!");
            }
            const fileTemplate = await prisma.file.findUnique({
                where: {
                    id,
                    isTemplate: true
                }
            });
            return fileTemplate;
        } catch (err) {
            console.error(err);
            throw new Error("Failed to fetch template by id!");
        }
    },
    uploadFile: async (file, name, isTemplate, typeId) => {
        try {
            const { createReadStream, filename } = await file;

            // kiểm tra type tồn tại
            const existType = await prisma.type.findUnique({ where: { id: typeId } });
            if (!existType) throw new Error('Type not exist!');

            // lưu file vào local folder 'uploads'
            const uploadDir = path.join(process.cwd(), 'uploads');
            if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

            const filePath = path.join(uploadDir, filename);
            await new Promise((resolve, reject) => {
                createReadStream()
                    .pipe(fs.createWriteStream(filePath))
                    .on('finish', resolve)
                    .on('error', reject);
                });

            const url = `/uploads/${filename}`; // backend tự sinh URL

            // lưu metadata vào DB
            const newFile = await prisma.file.create({
                data: { name, url, isTemplate, typeId },
            });

            return newFile;
        } catch (err) {
            console.error(err);
            throw new Error("Failed to upload file!");
        }
    },
};

export default fileService;
