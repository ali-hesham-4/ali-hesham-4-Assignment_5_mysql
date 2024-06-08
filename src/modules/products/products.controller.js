import connection from "../../../db/connectDB.js"

// =============================== (1) Add Product===========================

export const addProduct = (req,res,next) =>{
    const {productName , category , unitPrice} = req.body
    const query = `insert into products (productName , category , unitPrice) values ("${productName}" , "${category}" , "${unitPrice}")`
    connection.execute(query , (err , result) =>{
        if(err){
            return res.status(400).json({msg:"query error" , err})
        }
        if(!result.affectedRows){
            return res.status(400).json({msg:"query error" , err})
        }
        return res.status(201).json({msg:"Added Successfully" })
    })
}

// =============================== (2) Get Total Revenue Of a Category ===========================

export const categoryRevenue = (req,res,next) =>{
    const {category} = req.body
    const query = `select category , sum(unitPrice) as totalRevenue from products where category = "${category}" `
    connection.execute(query , (err , result) =>{
        if(err){
            return res.status(400).json({msg:"query error" , err})
        }
        return res.status(201).json(result)
    })
}

// =============================== (3) Get total number of items sold for each product ===========================

export const productQuantitySold = (req,res,next) =>{
    const {productID} = req.body
    const query = `SELECT SUM(quantity) as productQuantitySold FROM orderitems WHERE productID = "${productID}"`
    connection.execute(query , (err , result) =>{
        if(err){
            return res.status(400).json({msg:"query error" , err})
        }
        return res.status(201).json(result)
    })
}