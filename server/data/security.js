const jwt     = require('jsonwebtoken');
const bcrypt  = require('bcryptjs');

const generateHash = async (password) => {
    try {
        const salt = await bcrypt.genSalt(10);
        console.log('salt=',salt);
        const hash = await bcrypt.hash(password,salt);
        console.log('hash=',hash);
        return hash;
    } catch (error) {
        throw "Unable to salt and hash password!";
    }
};

const secret = 'secret';

const generateAuthToken = (id,access) => {
    const token = jwt.sign({id,access},secret).toString();
    console.log('token= ',token);
    return token;
};

const verifyAuthToken = (token) => {
    var decoded = jwt.verify(token,secret);
    console.log('decoded = ',decoded);
    return decoded;
};

// const authenticate = async (request,response,pool) => {
//     const token = request.header('x-auth');
//     console.log('token=',token);
//     try {
//         verifyAuthToken(token);
//         let rows = await pool.query(`SELECT user.id as id,username,email from user,token WHERE token='${token}' AND token.userid=user.id`);
//         console.log('rows=',rows);
//         if(rows.length===0) {
//             throw `User not found, token '${token }'!`;
//         }
//         const id        = rows[0].id;
//         const username  = rows[0].username;
//         const email     = rows[0].email;
//         const user      = {id,username,email};

//         request.user    = user;
//         reauest.token   = token;
//     } catch (error) {
//         console.log(error);
//         response.status(401).send();
//     }
// };

module.exports = {generateHash,generateAuthToken,verifyAuthToken};
