import jwt from './../libs/jwt.js';
const JWT_SECRET = process.env.JWT_SECRET

export const authMiddleware = (req) => {
    const header = req.headers.authorization;
    if(!header) {
        throw new Error("Authorization header missing");
    }
    const token = header.split(' ')[1];
    try {
        const user = jwt.verify(token, JWT_SECRET);
        return user;
    } catch (error) {
        throw new Error('Token is not valid!');
    }
}