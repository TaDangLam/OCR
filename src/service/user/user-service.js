import prisma from './../../libs/prisma.js';
import bcrypt from '../../libs/bcrypt.js';

const userService = {
    getAllUser: async () => {
        try {
            const Users = await prisma.user.findMany();
            return Users;
        } catch (err) {
            console.error(err);
            throw new Error(err.message);
        }
    },
    getUserId: async (id) => {
        try {
            const User = await prisma.user.findUnique({ where: { id }});
            return User;
        } catch (err) {
            console.error(err);
            throw new Error(err.message);
        }
    },
    register: async (name, email, password) => {
        try {
            const checkUser = await prisma.user.findUnique({ where: { email }});
            if(checkUser) {
                throw new Error('This email is exist');
            }
            const hashed = bcrypt.hashSync(password, 10);
            const newUser = await prisma.user.create({
                data: {
                    name,
                    email,
                    password: hashed
                }
            });
            return newUser;
        } catch (err) {
            console.error(err);
            throw new Error(err.message);
        }
    },
    // updateUser: async (id, name, email, password) => {
    //     try {
    //         const Types = await prisma.type.findMany();
    //         return Types;
    //     } catch (err) {
    //         console.error(err);
    //         throw new Error(err.message);
    //     }
    // },
    // deleteUser: async () => {
    //     try {
    //         const Types = await prisma.type.findMany();
    //         return Types;
    //     } catch (err) {
    //         console.error(err);
    //         throw new Error(err.message);
    //     }
    // },
};

export default userService;
