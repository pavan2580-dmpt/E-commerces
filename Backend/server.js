const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors')
app.use(express.json());
app.use(cors());


mongoose.connect('mongodb+srv://pavanganesh:pavanganesh@cluster0.axrs7n2.mongodb.net/E-commers?retryWrites=true&w=majority').then(
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
