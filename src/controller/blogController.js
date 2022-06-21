const blogModel= require("../models/blogModel")
const authorModel= require("../models/authorModel")
//const { find } = require("../models/blogModel")


exports.blogs = async function (req, res){
    try{

        let blogsData =req.body
        let user=await authorModel.findById(blogsData.authorId)
        if(!user)return res.status(400).send({status:false,msg:"id is incorrect"})
        if(blogsData.isPublished){
            blogsData.publishedAt=new Date()
        }
        if(blogsData.isDeleted){
            blogsData.deletedAt=new Date()
        }
        console.log(blogsData)

        let data = await blogModel.create(blogsData)
       return res.status(201).send ({status:true,data:data})
    }catch (error){
       return res.status(500).send({status:false, msg:error.message})
    }
   
}

exports.getBlogs=async function (req, res){
    try{
        // let authorId=req.query.authorId
        // let category=req.query.category
        // let tags=req.query.tags
        // let subcategory=req.query.subcategory
        console.log(req.query)
        req.query.isDeleted=false
        req.query.isPublished=true
        console.log(req.query)
        if(req.query.length!=0){
        let data=await blogModel.find(req.query)
         return res.status(200).send({status:true,data:data})
        }
        
    let data=await blogModel.find({isDeleted:false,isPublished:true})
    if(data!=null) return res.status(200).send({status:true,data:data})
    return res.status(404).send({status:false,msg:"No documents are found"})
   
        
    }catch (error){
       return res.status(500).send({status:false, msg:error.message})
    }
}


