const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors')
app.use(express.json());
app.use(cors());


mongoose.connect('Enter your mongoose url').then(
    ()=>{console.log("connected to database...")}
).catch(
    (err)=>{console.log("An error occured while connecting to database...")}
)


app.get('/',
    (req, res) => {
        res.send("Hello from the server");
    }
);



app.use('/uplaodproducts',express.static(__dirname+'/uplaodproducts'))
app.use("/apis",require('./routers/Routes'))
app.listen(3030, () => console.log("Server is running on port 3030..."));
