const blogModel = require("../models/blogModel")
const authorModel = require("../models/authorModel")



exports.blogs = async function (req, res) {
    try {

        let blogsData = req.body
        let user = await authorModel.findById(blogsData.authorId)
        if (!user) return res.status(400).send({ status: false, msg: "id is incorrect" })
        if (blogsData.isPublished) {
            blogsData.publishedAt = new Date()
        }
        if (blogsData.isDeleted) {
            blogsData.deletedAt = new Date()
        }
        console.log(blogsData)

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

        let data = await blogModel.find({ isDeleted: false, isPublished: true })//[]
       
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


