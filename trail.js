const mongoose = require("mongoose");
const express = require("express");
const bodyparser = require("body-parser");
const app=express()
app.use(express.static(__dirname+'/public'));
app.use(bodyparser.urlencoded({extended:true}));


mongoose.connect("mongodb://127.0.0.1:27017/userDB",{
        useNewUrlParser:true
});

const userSchema = mongoose.Schema({
            Username:{
                type:String,
                // required:true
            },
            Email:String,
            password:String
});
const guideSchema = mongoose.Schema({
    Guide:{
        type:String,
        // required:true
    },
    PhoneNumber:String,
    experience:String,
    location:String
});
const User = new mongoose.model("User",userSchema);
const Guide = new mongoose.model("Guide",guideSchema);
app.get("/",function(req,res){
    res.sendFile(__dirname+"/home.html")
});
app.get("/tourism",function(req,res){
    res.sendFile(__dirname+"/tourism.html")
});
app.get("/hotels",function(req,res){
    res.sendFile(__dirname+"/hotels.html")
});
app.get("/signup",function(req,res){
    res.sendFile(__dirname+"/signup.html");
});
app.get("/login",function(req,res){
    res.sendFile(__dirname+"/login.html");
});
app.get("/guide",function(req,res){
    res.sendFile(__dirname+"/guide.html");
});

// User.authenticate = async function(username,pass){
//     const user = await this.findOne({username});
//     if(!user){
//         throw new Error('Invalid');
//     }
//     const match = await user.comparePassword(pass);
//     if(!match){
//         throw new Error('Invalid');
//     }
//     return user;
// };

// userSchema.methods.comparePassword = async function(pass){
//     const isMatch = await bcrypt.compare(pass,this.password);
//     return isMatch;
// };
app.post("/",function(req,res){
    var user = (req.body.enter);
    var email = (req.body.enter1);
    var pass = (req.body.enter2);
    //res.send("the enetered rand num:"+num1);
    // const a = async()=> await .then((r)=>{console.log("connected successfully")})
    // .catch((err)=>{console.log("some error occured")});

    async function fun1(){
        const f = await User.create({Username:user,Email:email,password:pass});
        console.log(f); 
       
    }
    fun1();
});

app.post("/guide",function(req,res){
    var guide_name = req.body.name;
    var guide_location = req.body.location;
    var guide_phno = req.body.phonenumber;
    var guide_experience = req.body.experience;
    async function funn1(){
        const f = await Guide.create({Guide:guide_name,PhoneNumber:guide_phno,location:guide_location,experience:guide_experience});
        console.log(f);
    }
    funn1();

})

app.post("/login",async function(req,res){
    var username = req.body.cred;
    var pass = req.body.cred1;

    const usr=await User.find({Username:username})
    console.log(usr);
    if(usr[0].password == pass){
        res.send("welcome  "+username);
    }
    else{
        res.send("you entered the wrong credentials");
    }

    // try{
    //     const user = User.authenticate(username,pass);
    //     res.json(user);
    // }catch(err){
    //     res.status(401).json({ message: err.message});
    //}



    // const login = User.find({Username: username});
    
    // login.exec(function(err,entry){
    //     console.log("successful login");
    // })

});

app.listen(3000,function(){
   console.log("successfully connected");
});
