const authorModel= require("../models/authorModel")


const authors = async function (req, res){
    try{
        let authorsData =req.body
        let data = await authorModel.create(authorsData)
        res.send ({msg:data})
    }catch (error){
        res.status(500).send({status:false, msg:error.message})
    }
   
}





module.exports.authors=authors
