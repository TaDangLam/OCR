import prisma from './../../libs/prisma.js';
import bcrypt from '../../libs/bcrypt.js';
import jwt from './../../libs/jwt.js';
import { userInclude } from '../../constant/constant.js';

const userService = {
    getAllUser: async () => {
        try {
            const Users = await prisma.user.findMany({ include: userInclude });
            return Users;
        } catch (err) {
            console.error(err);
            throw new Error(err.message);
        }
    },
    getUserId: async (id) => {
        try {
            const User = await prisma.user.findUnique({
                include: userInclude,
                where: { id }
            });
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
    login: async (email, password) => {
        try {
            const user = await prisma.user.findUnique({ where: { email }});
            if(!user) {
                throw new Error('Email is not exist!');
            }
            const comparePassword = bcrypt.compareSync(password, user.password);
            if(!comparePassword) {
                throw new Error('Password is not incorrect');
            }
            const accessToken = jwt.sign(
                {id: user.id, email: user.email, isAdmin: user.isAdmin},
                process.env.JWT_ACCESS_SECRET,
                { expiresIn: '1d' }
            );
            const refreshToken = jwt.sign(
                {id: user.id, email: user.email, isAdmin: user.isAdmin},
                process.env.JWT_REFRESH_SECRET,
                { expiresIn: '30d' }                
            );
            return {
                user,
                accessToken,
                refreshToken
            }       
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
