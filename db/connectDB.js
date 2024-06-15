import mysql from 'mysql2'
const connection = mysql.createConnection("mysql://usezfyhfn1m1dsby:4evgKRpK4eYxLYS0Xyth@b9fwl8uxxlg0r4bhk7vb-mysql.services.clever-cloud.com:3306/b9fwl8uxxlg0r4bhk7vb")

connection.connect((err)=>{
    if(err){
        console.log({msg:"faild to connect to DataBase"});
    }else{
        console.log("connected to DataBase");
    }
})

export default connection