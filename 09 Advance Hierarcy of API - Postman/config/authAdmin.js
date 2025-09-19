const jwt = require("jsonwebtoken");

const authAdmin = async (req, res, next) => {
    try {
        const token = req.headers["authorization"];

        if (token) {
            let decoded = jwt.verify(token.slice(7, token.length), ".X")
            req.user = decoded;
            next();
            
        } else {
            return res.status(200).json({ message: "Token not found !!!" })
        }

    } catch (error) {
        return res.status(200).json({ message: "Internal server error of authAdmin !!!" })
    }

}
module.exports = authAdmin