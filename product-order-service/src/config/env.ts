import * as dotenv from 'dotenv';

dotenv.config();

export const env = {
    email: process.env.ADMIN_EMAIL || 'admin@gmail.com',
    password: process.env.ADMIN_PASSWORD || 'admin123',
};
