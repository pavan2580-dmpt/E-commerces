const express = require('express')
routes = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const uploadProducts = multer({dest:'uplaodproducts'})
const fs = require('fs');
const Product = require('../db/Products');
const User = require("../db/Users")
const Orders = require("../db/Orders")

// ------get for retriving the products ----------------------------------------
routes.route('/getProducts').get(async(req,res)=>{

    const Data =await Product.find({});
    res.send(Data)


})

// ------post for inserting the products ----------------------------------------

routes.route("/postproduct").post(uploadProducts.single('file'),async(req,res)=>{

    if(!req.file){
        res.send("Error");
    }
    const {originalname,path} = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length -1 ]
    const newPath = path+ '.'+ext 
    fs.renameSync(path,newPath);
    const {name,price,desc,cate,recomend,offer} = req.body;
    const PostProduct  = await Product.insertMany(
        {
            image:newPath,
            name:name,
            price:price,
            desc:desc,
            cate:cate,
            recomend:recomend,
            offer:offer
        }).then(
            ()=> res.send("Done...")
        )
})
// ----------------Users Register ------------------------------

routes.route('/createAccount').post(
    async(req,res)=>{
        const {name,email,password} = req.body;
        const Exist = await User.findOne({email})
        if(Exist){
            res.send("Email is used..");
        }
        else{
            const saltRounds = 10;
            const encryptPass =await bcrypt.hash(password,saltRounds);
            const NewUser = await User.insertMany({
                name:name,
                email:email,
                password:encryptPass
            })
            if(NewUser){
                res.send("user Created")
            }
            else{
                res.send("Some Error in creation user.")
            }
        }


    }
)

// ----------------Login-------------------------------
routes.route("/loginUser").post(
    async(req,res)=>{
        const {email,password} = req.body;
        if(!email || !password){
            res.status(400).send("All fieds are required..")
        }
        else{
            const ValidUser = await User.findOne({email});
            if(!ValidUser){
                res.send("In valid email")
            }
            else{
                if(await bcrypt.compare(password,ValidUser.password)){
                    const KEY = "@#$%^&*()";
                    const JsonToken = jwt.sign({
                        user:{
                            id:ValidUser.id,
                            email:ValidUser.email,
                            name:ValidUser.name
                        }
                    },KEY,{expiresIn:"1d"})
                    res.status(200).send(JsonToken)
                }
                else{
                    res.send("Wrong Password..")
                }
            }
        }
    }
)
// -----------------------token verification------------------------
routes.route("/validateToken").post(
    async(req,res)=>{
        const token = req.header('x-token'); 
        if (!token) {
            return res.status(403).send("No token found"); 
        } 
        else {       
            try {
                const decode = jwt.verify(token, "@#$%^&*()");
                if (!decode) {
                  return res.status(403).send("Invalid token"); 
                }
                const USERDATA = decode.user;
                    res.send(USERDATA);
              } catch (error) {
                console.error("JWT Verification Error:", error);
                return res.status(500).send("Token verification failed"); 
              }

    }
}
)
//   ----------------------------------update--------------------------------
routes.route('/updateUser').post(async (req, res) => {
    try {
      const { fname, lname, email, ChgPass, address, userId } = req.body;
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      } else {
        if (fname || lname || email || ChgPass || address) {
          if (fname) user.name = fname;
          if (lname) user.lname = lname;
          if (email) user.email = email;
          const saltRounds = 10;
          const encryptPass =await bcrypt.hash(ChgPass,saltRounds);
          if (ChgPass) user.password =encryptPass ;
          if (address) user.address = address;
  
          await user.save();
          const newToken = jwt.sign({ user }, '@#$%^&*()', { expiresIn: '1d' }); 

         return res.status(200).json({ user, token: newToken }); 
        } else {
          return res.status(400).json({ error: "No fields to update" });
        }
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Server error" });
    }
  });
  
// ------------------------- Oders Placed ---------------------------

routes.route('/PlaceOrders').post(
    async(req,res)=>{

       try {
        const { orders,email } = req.body;
        console.log('Received firstStrings:', orders);
        console.log('Received secondStrings:', email);
        const ResponseDataIS = await Orders.insert({
            userEmail:email,
            orders:orders,

        })
       if(ResponseDataIS){
        res.status(200).json({ message: 'Received arrays of strings successfully' });
       }
       else{
        res.status(400).json({ message: 'Error' })
       }

        
       } catch (error) {
            res.status(500).json({error})
       }


    })


  

module.exports = routes