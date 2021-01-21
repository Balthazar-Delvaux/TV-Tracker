import argon2 from 'argon2';

/**
 * Hash a password
 * @param {string} password - Password to hash
 * @returns {Promise<string>} returns a promise of a hashed password
 */
export function hashPassword (password) {
    try {
        return argon2.hash(password);
    } catch (error) {
        console.error(error);
        return null;
    }
}

/**
 * Verify if a password matches a hashed password
 * @param {string} hashedPassword
 * @param {string} password
 * @returns {Promise<boolean>} returns true or false
 */
export async function verifyPassword (hashedPassword, password) {
    try {
        if (await argon2.verify(hashedPassword, password)) return true;
        return false;
    } catch (err) {
        console.error(err);
        return false;
    }
}
