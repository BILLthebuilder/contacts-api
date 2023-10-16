// encryption.js
const crypto = require('crypto');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];

const { secretKey, secretIv, encryptionMethod } = config


if (!secretKey || !secretIv || !encryptionMethod) {
    throw new Error('secretKey, secretIV, and ecnryptionMethod are required')
}

// Generate secret hash with crypto to use for encryption
const key = crypto
    .createHash('sha512')
    .update(secretKey)
    .digest('hex')
    .substring(0, 32)
const encryptionIV = crypto
    .createHash('sha512')
    .update(secretIv)
    .digest('hex')
    .substring(0, 16)

// Encrypt data
 function encryptData(data) {
    const cipher = crypto.createCipheriv(encryptionMethod, key, encryptionIV)
    return Buffer.from(
        cipher.update(data, 'utf8', 'hex') + cipher.final('hex')
    ).toString('base64') 
}

// Decrypt data
 function decryptData(encryptedData) {
    const buff = Buffer.from(encryptedData, 'base64')
    const decipher = crypto.createDecipheriv(encryptionMethod, key, encryptionIV)
    return (
        decipher.update(buff.toString('utf8'), 'hex', 'utf8') +
        decipher.final('utf8')
    ) 
}

module.exports = { encryptData, decryptData };
