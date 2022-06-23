const jwt = require("jsonwebtoken");
//authentication
exports.authentication = function (req, res, next) {
    //check the token in request header
    //validate this token
    let token = req.headers["x-Auth-token"];
    if (!token) token = req.headers["x-auth-token"];

    //If no token is present in the request header return error
    if (!token) return res.send({ status: false, msg: "token must be present" });

    console.log(token)
     next()
};
    exports.authorization=function (req, res, next) {
    let decodedToken = jwt.verify(token, "MSgroup-3");
    if (!decodedToken)
        return res.send({ status: false, msg: "token is invalid" });
        
    let authorToBeModified = req.params.authorId
    let authorLoggedIn = decodedToken.authorId
    if (authorToBeModified != authorLoggedIn){ return res.send({ status: false, msg: 'author logged is not allowed to modify the requested users data'})
}else{
    next()
}
};
