const models = require('../models');
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken');

function signUp (req, resp){

    models.User.findOne({where:{
        [models.Sequelize.Op.or]: [ { email: req.body.email }, { mobile: req.body.mobile } ]
    }}).then(result=>{
        if (result) {
            if (result.email === req.body.email) {
                resp.status(409).json({
                    message: "Email already exists!"
                });
            } else if (result.mobile === req.body.mobile) {
                resp.status(409).json({
                    message: "Mobile number already exists!"
                });
            } else {
                resp.status(409).json({
                    message: "Email and mobile number already exists!"
                });
            }
        }
        else{
            bcryptjs.genSalt(10, function(err, salt){
                bcryptjs.hash(req.body.password, salt, function(err, hash){
                    const user = {
                        name: req.body.name,
                        email: req.body.email,
                        mobile: req.body.mobile,
                        password: hash,
                    }
                
                    models.User.create(user).then(result =>{
                        resp.status(201).json({
                            message: "Post created successfully",
                            post: result
                        });
                    }).catch(error =>{
                        resp.status(500).json({
                            message:"Something went wrong",
                            error: error
                        });
                    })
                });
            });

        }
    })

}

function login(req, resp){

    models.User.findOne({where:{email:req.body.email}}).then(user=>{
        if(user === null){
            resp.status(401).json({
                message:"Invalid Credentials! Please enter valid data."
            })
        } else {
            bcryptjs.compare(req.body.password , user.password, function(err, result){
                if(result){
                    const token = jwt.sign({
                        email : user.email,
                        userId: user.id
                    }, 'secret', function(err, token){
                        resp.status(200).json({
                            message: "Authenticated successfully!",
                            token: token
                        });
                    });
                } else {
                    resp.status(401).json({
                        message:"Invalid Credentials! Please enter valid data."
                    }) 
                }
            })
        }

    }).catch(error =>{
        resp.status(500).json({
            message:"Something went wrong!",
            error: error
        })

    });

}

module.exports ={
    signUp: signUp,
    login: login
}