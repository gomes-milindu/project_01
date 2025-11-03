import express from "express";
import mongoose from "mongoose";
import Student from "./models/student.js";
import studentRouter from "./routers/studentRouter.js";
import userRouter from "./routers/userRouter.js";
import user from "./models/user.js"
const connectionString = "mongodb+srv://user-1:1234@cluster0.arkyzdz.mongodb.net/?appName=Cluster0";
import jwt from "jsonwebtoken"
import productRouter from "./routers/productRouter.js";
import cors from "cors";


mongoose.connect(connectionString).then(
   ()=> console.log("mongoose connected")
).catch(
   err=> console.log("mongoose not connected",err)
);




const app = express();
app.use(cors());
app.use(express.json())
app.use(
    (req,res,next)=>{
        let token = req.header("Authorization")
       

        if(token != null){
             token = token.replace("Bearer ","")
             console.log(token)
             jwt.verify(token,"jwt-secret",
                (err,decoded)=>{
                    if(decoded == null){
                        res.json(
                            {
                                message: "invalid token"
                            }
                        )
                        return // methanin ehata run krwnna epa
                    }else{
                        console.log(decoded)
                        req.user = decoded
                    }
                }
             ) // token eka decrypt krnwa
        }

        next()  // req eka eelaga kenata ynwa
    }
)
app.listen(5000, success);

function success(){
    console.log("Succes is working");
    
}

// router use  krnwa

app.use("/students",studentRouter);
app.use("/users",userRouter)

app.use("/products",productRouter)

app.get("/",(req,res)=>{
    
    // data abse eken data gamu
    user.find().then(
        (data)=>{
            console.log(data);
            res.json(data);
        }
    ).catch();
    
});

// app.post("/",(req,res)=>{
//     console.log("Post Request Started");

//     const student1 = new Student({
//         name : req.body.name + "gom",
//         age : req.body.age,
//         city : req.body.city
//     }
//     );

//     student1.save();

    

    
// });

