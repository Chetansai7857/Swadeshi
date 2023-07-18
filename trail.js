const mongoose = require("mongoose");
const express = require("express");
const bodyparser = require("body-parser");
const { name } = require("ejs");
const app=express()
app.set('view engine','ejs');
app.use(express.static(__dirname+'/public'));
app.use(bodyparser.urlencoded({extended:true}));
var a=[]
var requ=[]
var send=[]
var convert1 = {}
var credentials={}
var credentials1="yes"
var unknown1={}
var unknown2 = [];
var change = "sudheer"
mongoose.connect("mongodb://127.0.0.1:27017/userDB",{
        useNewUrlParser:true
});

const userSchema = mongoose.Schema({
            Username:{          
                type:String,
                // required:true
            },
            Email:String,
            password:String,
            Questions:[],
            Answers:{},
            reviews:Object,
});
const careSchema = mongoose.Schema({
    Username:{          
        type:String,
        // required:true
    },
    Email:String,
    phone_number:String,
    password:String,
    Questions:{any: [{}]},
    Answers:[],
    reviews:[],
});
const guideSchema = mongoose.Schema({
    name:{
        type:String,
        // required:true
    },
    phone_number:Number,
    E_mail:String,
    price:Number,
    location:String,
    rating:Number,
    languages:[],
    gvn_ratings: {any: [{}]},
});
const hotelSchema = mongoose.Schema({
    Place:{
        type:String,
        // required:true
    },
    Name:String,
    Price:Number,
    image:String,
    Rating:{
        type:Number,
        min:1,
        max:5,
    },
    review :{any: [{}]},
})
const bookingSchema = mongoose.Schema({
    Destination:String,
    Hotelname:String,
    Phonenumber:String,
    Numberofpeople:String,
        })
    
// });
const User = new mongoose.model("User",userSchema);
const Guide = new mongoose.model("Guide",guideSchema);
const Care = new mongoose.model("Care",careSchema);
const Hotel = new mongoose.model("Hotel",hotelSchema);
const Booking = new mongoose.model("Booking",bookingSchema);

const guide = new Guide({
    name:"Praveen",
    price: 5000,
    location :"hyderabad",
    rating :"5",
    languages: [],
    Email:"praveen@gmail.com",
    phonenumber: "8988546766",
    gvn_ratings:{},
    
});
// guide.save();

const care = new Care({
    Username:"abc",
    Email:"abc@gmail.com",
    phone_number:"9245678906",
    password:"123456",
    Questions:{},
    Answers:[],
    reviews:[],
})
const hotel = new Hotel({
    Place: "vizag",
    Name :"Chetan2 Hotel",
    Price: 4000,
    Rating:4,
    review:{},
});

const book = new Hotel({
    Place: "vizag",
    Name :"vikas Hotel",
    Price: 2000,
    Rating:4,
});
hotel.save();
app.get("/",function(req,res){
    res.sendFile(__dirname+"/home.html")
});
app.get("/tourism",function(req,res){
    //res.render("tourism");
    res.sendFile(__dirname+"/login.html");
});
app.get("/hotels",function(req,res){
    res.render("hotels",{pandagow:send,enjoy:convert1})
});
app.get("/signup",function(req,res){
    res.sendFile(__dirname+"/signup.html");
});
app.get("/login",function(req,res){
    res.sendFile(__dirname+"/login.html");
});
app.get("/guide",function(req,res){
    res.render("guide",{display:requ,displ:unknown2});
});
app.get("/customercare",function(req,res){
    res.render("customercare",{trap:unknown1});
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
app.post("/tourism",function(req,res){
    // var a=req.body.ques;
    res.sendFile(__dirname+"/login.html");
})
app.post("/hotels",function(req,res){
    var choice = req.body.logic;
    // console.log(choice);
    if(choice=="search"){
        var destination = req.body.destination;
        var price = req.body.price;
        var rating = req.body.rating;
        async function serach(){
            var a = await Hotel.find({Place:destination,Price:{$lte:price},Rating:{$gte:rating}});
            if(a.length>0){
                send=a;
                res.render("hotels",{pandagow:send,enjoy:convert1})
            }
            else{
                console.log(a);
                res.send("invalid credentials entered");
            }
        }
        serach()
    }
    else if(choice=="book"){
        var destination = req.body.desination;
        var hotelname = req.body.hotelname;
        var phno = req.body.phno;
        var people = req.body.people;
        async function drop(){
            await Booking.create({Destination:destination,Hotelname:hotelname,Phonenumber:phno,Numberofpeople:people});
        }
        drop()
    }
    else if(choice=="seasubm"){
        var hotelname = req.body.hotelna;
        var username = req.body.username;
        var review = req.body.review;
        async function rev(){
            var a = await Hotel.find({Name:hotelname});
            console.log(a);
            var revis =await  a[0].review;
            console.log(revis);
            revis[username] = review;
            // console.log(revis);
            await Hotel.updateOne({Name:hotelname},{$set:{review:revis}})
        }
        rev()
    }
    else{
        console.log("seasub");
        var hotelname = req.body.hotelname1;
        var place = req.body.place1;
        async function findit(){
            var b = await Hotel.find({Name:hotelname});
            console.log(b);
            if(b.length<0){
                console.log("invalid credentials");
            }
            else{
                convert1 = b[0].review; 
                console.log(convert1);
                res.render("hotels",{enjoy:convert1,pandagow:send});
            }
        }
    findit();
    }  
})
app.post("/tourisms",function(req,res){
    var choice = req.body.form1;
    if(choice==="form2"){
        var quest = req.body.ques;
        var required = credentials.Username;
        console.log(" jhegfkwvefk required");
        console.log(required)
        //console.log(required);
        async function f1()
        {
            var requir = await Care.find({Username:change});//await User.find({Username:required});
            // console.log(requir);
            // console.log(credentials);
            var questi = await requir[0].Questions;
            // console.log("questi");
            console.log(questi);

            if(questi[required]==null)
            {
                questi[required] = [quest];
            }
            else
            {
                questi[required].push(quest)
            }
            await Care.updateOne({Username:change},{$set:{Questions:questi}}); 
            var reir = await User.find({Username:required});
            // console.log(reir);
            var questio = reir[0].Questions;
            questio.push(quest);
            await  User.updateOne({Username:required},{$set: {Questions:questio}});  
             
        } 
        f1()
    }
    res.render("tourism",{success:credentials});

    
    //  console.log(e);
    //user1.Questions.push(quest);
})
// console.log(credentials);
app.post("/guide", async function(req,res){
   var logic = req.body.logic;
//    console.log(logic);
    if(logic==="form1"){
        var locs = req.body.loc;
        var prics = req.body.price;
        var ratins = req.body.rating;
        var languas = req.body.lang;
        var b = await Guide.find({price: prics,rating:ratins,location:locs});
        console.log(b);
        if(b.length == 0||b==null){
            res.send("the credenstials doesnot match");
        }
        requ=[]
        for(i=0;i<b.length;i++){
            var c=b[i].languages;
           // console.log(c);
            for(j=0;j<c.length;j++){
                var lang = c[j];
                //console.log(lang);
                if(lang===languas){
                   // console.log(languas);
                    requ.push(b[i]);
                    // res.redirect("/guide");
                }
            }
        }
        console.log(requ);
        if(requ.length===0){
            res.send("the credentials doen not match");
        }
        else{
            res.redirect("/guide");
        }

    }
    if(logic==="form2"){
        console.log(logic);
        var guide = req.body.guide;
        console.log(guide);
        async function f1(){
            var abc = await Guide.find({name:guide});
            console.log(abc);
            if(abc.length===0){
                res.send("the guide with the existing credentials does not exist");
            }
            else{
                console.log(abc[0].gvn_ratings);
                unknown2=abc;
                res.render("guide",{display:requ,displ:unknown2})
            }
        }
        f1()
    }

});

app.post("/login",async function(req,res){
    var username = req.body.cred;
    var pass = req.body.cred1;

    const usr=await User.find({Username:username})
    //console.log(usr);   
    if(usr[0].password == pass){
        credentials = usr[0]
        //console.log(credentials);
        // res.send("welcome  "+username);
        res.render("tourism",{success:credentials});
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
app.post("/customercare",function(req,res){
    var decision = req.body.button;
    if(decision==="login"){
    var user = req.body.username;
    var pass = req.body.password;
    async function findit(){
        const a = await Care.find({Username:user,password:pass})
        console.log(a);
        var unknown = await Care.find({Username:change});
        var unknown1 = unknown[0].Questions;
    if(a.length>0){
        res.render("customercare",{trap:unknown1});
    }
    else{
        console.log("invalid credentials");
    }
}
findit();
}
else{
    var climaxx = req.body.climaxx;
    console.log(decision);
    async function climax(){
        var answer = req.body.answers;
        var cli = await User.find({Username:decision});
        if(cli.length===0){
            console.log("invalid");
        } 
        else{
            console.log(climaxx);
            var ans = cli[0].Answers;
            ans[climaxx] = answer;
            await User.updateOne({Username:decision},{$set:{Answers:ans}});
        }
    }
    climax();
}
})

app.listen(3000,function(){
   console.log("successfully connected");
});
