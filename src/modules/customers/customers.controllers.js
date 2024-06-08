import connection from "../../../db/connectDB.js"


// =============================== (1) SignUp===========================
export const signUp = (req,res,next) =>{
    const {firstName , lastName , email , password , phone } = req.body
    const query = `insert into customers (firstName , lastName , email , password , phone) values ("${firstName}" , "${lastName}" , "${email}" , "${password}" , "${phone}" )`
    connection.execute(query,(err,result)=>{
        if(err){
            if(err.errno == 1062){
                return res.status(400).json({msg:"This Email is Exist"})
            }
            return res.status(400).json({msg:"query error" , err})
        }
        if(!result.affectedRows){
            return res.status(400).json({msg:"query error", err})
        }
        return res.status(201).json({msg:"signedUp successfully"})
    })
}


// =============================== (2) Login===========================
export const login = (req,res,next) =>{
    const {email , password } = req.body
    const query = `select * from customers where email="${email}" && password = "${password}"`
    connection.execute(query,(err,result)=>{
        if(err){
            return res.status(400).json({msg:"query error" , err})
        }
        if(result.length == 0){
            return res.status(400).json({msg:"Email or Password are not Correct"})
        }
        delete result[0].password
        return res.status(201).json({msg:"logedin successfully" , result})
    })
}