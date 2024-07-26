const express = require('express');
const app = express();
const path=require('path');
const urlRoute = require('./routes/url');
const staticRoute = require('./routes/staticRouter');
const userRoute = require('./routes/user');
const port = 8000;

const {connectToMongoDB} = require('./connection');
const URL = require('./models/url');

connectToMongoDB('mongodb://localhost:27017/SHORT-URL-Generator')
.then(() => {
    console.log('database connected successfully!');
})
.catch((error) =>{console.log('DB facing errors!')});
//for parse a req body
app.use(express.json());
// for parse form data 
app.use(express.urlencoded({extended:false}));

// set your view template engine -ejs
app.set('view engine','ejs');
// tell the path of views file to express
app.set('views',path.resolve('./views'));
app.use('/url',urlRoute);
app.use('/',staticRoute);
app.use('/user',userRoute);
app.get('/url/:shortId',async (req,res) =>{
    const shortId = req.params.shortId;
 const entry =await URL.findOneAndUpdate(
    {
        shortId,
    },
    {
        $push:{
        visitHistory:{
            timestamp:Date.now()
        }
       },
    }
);
res.redirect(entry.redirectURL);
})


// server side rendering
// app.get('/test', async (req,res) =>{
//     // show all urls in webpage
//     const allURLS=await URL.find({});
//     return res.render('home',{urls:allURLS});
// });
app.listen(port,() => {
    console.log(`server started at port no.${port}`);
});