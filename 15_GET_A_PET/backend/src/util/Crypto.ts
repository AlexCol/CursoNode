import bcrypt from 'bcrypt';
import logger from '../middleware/global/logger/logger';

export const CryptoPassword = async (password: string): Promise<string> => {
    const saltSize = Number(process.env.SALT_SIZE) || 12;
    const salt = await bcrypt.genSalt(saltSize);
    return await bcrypt.hash(password, salt);
}

export const ComparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
    try {
        return await bcrypt.compare(password, hashedPassword);
    } catch (error) {
        logger.error(error);
        return false;
    }
}