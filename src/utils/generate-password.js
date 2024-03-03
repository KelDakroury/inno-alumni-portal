const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@$%^&*()_+=-';

/**
 * Generate a random password.
 * @param {Object} param0 - Object containing the length of the password.
 * @param {number} param0.length - Length of the password to be generated.
 * @returns {string} Generated password.
 */
export const generatePassword = ({ length }) => {
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
