const blogModel = require("../models/blogModel")
const authorModel = require("../models/authorModel")
const mongoose = require('mongoose');
const ObjectId = require('mongoose').Types.ObjectId;



exports.createBlogs = async function (req, res) {
    try {
        let blogsData = req.body

        //check if the data in request body is present or not ?
        if (!Object.keys(blogsData).length) {
            return res.status(400).send({ status: false, msg: "Please Enter the Data in Request Body" });
        }
        //check Title is Present or Not ?
        if(!blogsData.title){
            return res.status(400).send({ status: false, msg: "Please Enter the Title" });
        }
        //check Body is Present or Not ?
        if(!blogsData.body){
            return res.status(400).send({ status: false, msg: "Please Enter the Body of Blog" });
        }
        //check Id is Present Or Not in req.body
        if(!blogsData.authorId){
            return res.status(400).send({ status: false, msg: "Id is Not Present" });
        }

        //check the author Id is Valid or Not ?
        if(!ObjectId.isValid(blogsData.authorId)){
            return res.status(400).send({ status: false, msg: "Id is Invalid" });
        }

        //check if id is present in Db or Not ? 
        let user = await authorModel.findById(blogsData.authorId)
        if (!user) return res.status(404).send({ status: false, msg: "This Id is not present in Author DB" })

        //check if Category is present or not ?
        if (!blogsData.category){
            return res.status(400).send({ status: false, msg: "Please Enter the Category of Blog" });
        }

        //check if isDeleted is TRUE/FALSE ?
        if(!(typeof blogsData.isDeleted==="boolean")){
            return res.status(400).send({ status: false, msg: "isDeleted Must be TRUE OR FALSE" });
        }

        // if isPublised is true add the current Time&Date in publishedAt?
        if (blogsData.isPublished) {
            blogsData.publishedAt = new Date()
        }
        // if isDeleted is true add the current Time&Date in deletedAt?
        if (blogsData.isDeleted) {
            blogsData.deletedAt = new Date()
        }
       
        //add the data in DB
        let data = await blogModel.create(blogsData)
        return res.status(201).send({ status: true, data: data })
    } catch (error) {
        return res.status(500).send({ status: false, msg: error.message })
    }

}

exports.getBlogs = async function (req, res) {
    try {
        

        if (Object.keys(req.query).length!== 0) {
           
            req.query.isDeleted = false
            req.query.isPublished = true
           
            let data = await blogModel.find(req.query) 

            if (data.length != 0) return res.status(200).send({ status: true, data: data })

            return res.status(400).send({ status: false, msg: "Bad Request" })
        }

        let data = await blogModel.find({ isDeleted: false, isPublished: true })
       
        if (data.length!=0) return res.status(200).send({ status: true, data: data })

        return res.status(404).send({ status: false, msg: "No documents are found" })


    } catch (error) {
        return res.status(500).send({ status: false, msg: error.message })
    }
}

exports.updateBlogs=async function(req,res){
    let blogId= req.params.blogId
    let blog =await blogModel.findById(blogId)

    console.log(blog)
    if(!blog) return res.status(404).send("id is incorrect")
    if(blog.isDeleted)  return res.status(404).send("id is incorrect")

    let data =req.body ;
    if(!data) return res.status(400).send({ status: false, msg: "Bad Request" });
    let updateDate=await blogModel.findByIdAndUpdate(blogId,data,{new:true});
    return res.status(201).send({status:true,data:updateDate});
}


