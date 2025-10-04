import prisma from './../../libs/prisma.js';
import { typeInclude } from './../../constant/constant.js';

const typeService = {
    getAllType: async () => {
        try {
            const Types = await prisma.type.findMany({ include: typeInclude });
            return Types;
        } catch (err) {
            console.error(err.message);
            throw new Error(err.message);
        }
    },
    createType: async(name) => {
        try {
            const newType = await prisma.type.create({
                data: { name }
            });
            return newType;
        } catch (err) {
            console.error(err.message);
            throw new Error(err.message);
        }    
    },
    updateType: async(id, name) => {
        try {
            const existType = await prisma.type.findUnique({ where: { id }});
            if(!existType) {
                throw new Error("Type is not exist!");
            }
            const updateType = await prisma.type.update({
                where: { id },
                data: { name: name ?? existType.name }
            });
            return updateType;
        } catch (err) {
            console.error(err.message);
            throw new Error(err.message);
        }
    },
    deleteType: async(id) => {
        try {
            const existType = await prisma.type.findUnique({ where: { id }});
            if(!existType) {
                throw new Error("Type is not exist!");
            }
            await prisma.type.update({
                where: { id },
                data: { isDelete: true }
            });
            return {
                success: "OK",
                messsage: "Delete is Successfully!"
            }
        } catch (err) {
            console.error(err.message);
            throw new Error(err.message);
        }
    },
};

export default typeService;