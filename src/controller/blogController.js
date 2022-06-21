const blogModel= require("../models/blogModel")

exports.blogs = async function (req, res){
    try{

        let blogsData =req.body
        if(blogsData.isPublished){
            blogsData.publishedAt=new Date()
        }
        console.log(blogsData)

        let data = await blogModel.create(blogsData)
        res.send ({msg:data})
    }catch (error){
        res.status(500).send({status:false, msg:error.message})
    }
   
}

// module.exports.authors=authors