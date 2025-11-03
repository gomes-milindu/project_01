import Student from "../models/student.js";

export function getReqStudentRouter(req,res){
    console.log("Get request into Student Router");
}

export function postReqStudentRouter(req,res){
    
    if(req.user == null){
        res.status(404).json(
            {
                message: "please login and try again"
            }
        )
        return
    }

    if(req.user.role != "admin"){
        res.status(403).json(
            {
                message: "you must be an admin to create a student"
            }
        )
        return
    }
    const student1 = new Student(
        {
            name: req.body.name,
            age:req.body.age,
            city: req.body.city
        }
    )

    
}

export function putReqStudentRouter(req,res){
    console.log("Put request into Student Router");
}

export function deleteReqStudentRouter(req,res){
    console.log("Delete request into Student Router");
}

