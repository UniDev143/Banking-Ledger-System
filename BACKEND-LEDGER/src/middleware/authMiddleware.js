const userModel = require('../model/user');
const jwt = require('jsonwebtoken');






async function authMiddleware(req, res, next) {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1]; //ye check ker raha hai ke hamara token cookie ya header me a raha hai ya nahi 
    if (!token) {
        return res.status(401).json({
            message: "Unauthorized",
            status: "fail"
        });
    }


    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); //ye token ko verify kar raha hai, agar token valid hai to decoded me userId milega
        const user = await userModel.findById(decoded.userId);

        req.user = user; // Attach user to request object for further use in controllers
        return next();

    } catch (error) {
        return res.status(401).json({
            message: "Unauthorized (Token invalid)",
            status: "fail"
        });
    }
}


module.exports = {
    authMiddleware
}

// is middleware ka kam ye hai ke jab bhi koi request aayegi to wo pehle
//  is middleware se guzregi aur ye check karega ke kya request me token 
// hai ya nahi, agar token hai to wo usko verify karega aur user ko request 
// object me attach kar dega taki controllers me use kiya ja sake, agar token
//  nahi hai ya invalid hai to wo unauthorized response bhej dega.