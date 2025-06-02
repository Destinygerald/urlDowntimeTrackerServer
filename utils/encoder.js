import bcrypt from 'bcryptjs';


export function hashPassword(password) {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, 10, (err, hash) => {
            if (err) reject(err);
            resolve(hash)
        })
    })  
}

export async function comparePassword(password, hash) {
    const match = await bcrypt.compare(password, hash)
    return match;
}