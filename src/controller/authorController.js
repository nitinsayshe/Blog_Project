const authorModel = require("../models/authorModel")


const authors = async function (req, res) {
    try {
        let authorsData = req.body;
        console.log(authorsData)
        console.log(req.body)
        console.log(Object.keys(authorsData).length) 

        //check if the data in request body is present or not ?
        if (!Object.keys(authorsData).length) {
            return res.status(400).send({ status: false, msg: "Please Enter the Data in Request Body" });
        }

        //check the First & Last Name is present in req.body or not ?
        if (!req.body.fname || !req.body.lname) {
            return res.status(400).send({ status: false, msg: "Missing Name" });
        }

        //check the title is valid or not ?
        console.log(req.body.title)
        if(req.body.title in ["Mr", "Mrs", "Miss"]){
            return res.status(400).send({ status: false, msg: "Title Not Matched" });
        }

        //check the email is unique and valid
        let emailFlag = await authorModel.findOne({ email: req.body.email })
        if (emailFlag) {
            return res.status(400).send({ status: false, msg: "E-mail is Already Present in DB" })
        }

        //load the data in database
        let data = await authorModel.create(authorsData)
        return res.status(201).send({ status: true, data: data })
    } catch (error) {
        return res.status(500).send({ status: false, msg: error.message })
    }

}





module.exports.authors = authors
