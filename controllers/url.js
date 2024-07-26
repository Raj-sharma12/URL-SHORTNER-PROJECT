const shortid =require('shortid');
const URL = require('../models/url');
async function handleGenerateNewShortUrl(req,res){
// first generate a short id
const shortID = shortid();
const body=req.body;
if(!body.url){
    return res.status(400).json({error:"URL is required!"});
}
// create a newurl in database
await URL.create({
    shortId:shortID,
    redirectURL:body.url,
    visitHistory:[],
})
// return res.json({id:shortID});
return res.render('home',{id:shortID});
}

//create a function analytics
async function handleGetAnalytics(req,res){
    const shortId=req.params.shortId;
 const result =   await URL.findOne({shortId});
 return res.json({totalClicks:result.visitHistory.length,
    analytics:result.visitHistory,
 })
} 

module.exports = {
    handleGenerateNewShortUrl,
    handleGetAnalytics,
}