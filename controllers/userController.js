import user from "../models/user.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"




export function createUser(req,res){
    
    
    const hashPassword = bcrypt.hashSync(req.body.password,10)
    const newuser = new user(
        {
            email:req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: hashPassword
        }
    )


    newuser.save().then(
        ()=>{
            res.json({
                message: "user created succesfully"
            })
        }
    ).catch(
        ()=>{
            res.json({
                message: "Failed to create user"
            })
        }
    );
}

// req eke body eke email eka wage email thiyenwada kiyala hoynna kiynwa
export function loginUser(req,res){
    console.log("login user us working")
    user.findOne(
        {
            email:req.body.email
        }
    ).then(
        (user)=>{
            if(user == null){
                res.json(
                    {
                        "message": "User not found"
                    }
                )
            }else{
                const isPasswordMatching = bcrypt.compareSync(req.body.password , user.password)
                if(isPasswordMatching){

                    const token = jwt.sign(
                        {
                            email:user.email,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            role: user.role,
                            isEmailVerified: user.isEmailVerified

                        },
                        process.env.JWT_SECRET, // encrypt key eka
                    )
                    res.json({
                        "message": "Login Succesfull",
                        "token": token,
                        "user": user,
                    })
                }else{
                    res.json({
                        "message": "Invalid Password"
                    })
                }
            }
        }
    )
}


export function isAdmin(req){
    if(req.user == null){
        
        return false;
    }

    if(req.user.role != "admin"){
        
        return false
    }

    return true;
}