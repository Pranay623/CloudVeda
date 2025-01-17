import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import exp from 'constants';

const secretKey = crypto.randomBytes(32).toString('hex');

function generateToken(user){
    const payload = {
        id: user._id,
        email: user.email,
        role: user.role,
    }
    return jwt.sign(payload, secretKey, {expiresIn: '24h'});
};

export {generateToken,secretKey};