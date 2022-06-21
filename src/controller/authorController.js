const authorModel= require("../models/authorModel")


const authors = async function (req, res){
    try{
        let authorsData =req.body
        let data = await authorModel.create(authorsData)
       return res.status(201).send ({status:true,data:data})
    }catch (error){
       return res.status(500).send({status:false, msg:error.message})
    }
   
}





module.exports.authors=authors
