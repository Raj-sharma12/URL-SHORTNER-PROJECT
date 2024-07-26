const User = require('../models/user');
async function handleUserSignUP(req,res){
    const {name,email,password} = req.body;
    // create a user in database
    await User.create({
        name,email,password,
    });
    // if user done signup i render on home page
    return res.render('home');
}
async function handleUserLogin(req,res){
    const {email,password} = req.body;
    const user=await User.findOne({email,password});
    console.log('user',user);
    //if no user or password either email wrong or password wrong
    if(!user){
        
        return  res.render('login',{err:'invalid username or password'});
      
    }
//    if user match with db the redirect with homepage

    return res.redirect('/');
}


module.exports = {
    handleUserSignUP,
    handleUserLogin,
}