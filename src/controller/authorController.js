const authorModel = require("../models/authorModel")


const authors = async function (req, res) {
    try {
        let authorsData = req.body
        if(req.body.length===0){
            return res.status(400).send({status:false,msg:"Please Enter the Data in Request Body"})
        }
        if(!req.body.fname || !req.body.lname) {
            return res.status(400).send({status:false,msg:"Missing Name"})
        }
        
        let emailFlag = await authorModel.findOne({ email: req.body.email })
        console.log(emailFlag)
        if (emailFlag) return res.status(400).send({ status: false, msg: "E-mail is Already Present in DB" })
        let data = await authorModel.create(authorsData)
        return res.status(201).send({ status: true, data: data })
    } catch (error) {
        return res.status(500).send({ status: false, msg: error.message })
    }

}





module.exports.authors = authors
