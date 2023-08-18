const Validator = require('fastest-validator')
const models = require('../models')

function save(req, resp) {
    // console.log(req, "Request....")
    const post = {
        title : req.body.title,
        content: req.body.content,
        imageUrl : req.body.image_url,
        categoryId : req.body.category_id,
        userId : 1
    } 

    const schema = {
        title :{type:"string", optional:false, max:"100"},
        content :{type:"string", optional:false, max:"500"},
        categoryId :{type:"number", optional:false}
    }

    const v = new Validator();
    const validationResponse = v.validate(post, schema);

    if(validationResponse !== true) {
        return resp.status(400).json({
            message:"Validation Failed",
            errors:validationResponse
        });
    }

    models.Post.create(post).then(result=>{
        resp.status(201).json({
            message: "Post created successfully",
            post: result
        })
    }).catch(error=>{
        resp.status(500).json({
            message: "Somwthing went wrong",
            error: error
        })
    });
}

function show(req, resp) {
    const id = req.params.id

    models.Post.findByPk(id).then(result=>{
        console.log(result, 'Result')
        if(result != null){
            resp.status(200).json(result);
        }else {
            resp.status(501).json({
                message:"No data found"
            })
        }
    }).catch(error =>{
        console.log(error, "Error")
        resp.status(500).json({
            message:"Oops! Somwthing went wrong."
        })
    })
}

function getAllData(req, resp){
    models.Post.findAll().then(result=> {
        resp.status(200).json(result)
    }).catch(error =>{
        resp.status(501).json({
            message:"Oops! Something went wrong."
        })
    })
}

function updateData(req, resp){
    const id = req.params.id
    const data = {
        title : req.body.title,
        content: req.body.content,
        imageUrl : req.body.image_url,
        categoryId : req.body.category_id
    } 
    const userId = 1;
    models.Post.update(data, {where: {id:id, userId:userId}}).then(result=>{
        resp.status(201).json({
            message:"Post updated successfully",
            post: data 
        })
    }).catch(error=>{
        resp.status(500).json({
            'message':"Something went wrong.",
            error: error
        })
    })
}

function deletepost(req, resp){
    const id = req.body.id
    const userId = 1
    models.Post.destroy({where:{id:id, userId:userId}}).then(result =>{
        resp.status(200).json({
            message:"Post deleted successfully.",
            post:result
        })
    }).catch(error =>{
        message: "Something went wrong please try after sometime."
        error:error
    })
}

module.exports = {
    save: save, 
    show:show,
    showall:getAllData,
    updateData:updateData,
    deletepost:deletepost
}