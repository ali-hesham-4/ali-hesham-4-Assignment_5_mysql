import connection from "../../../db/connectDB.js"

// =============================== (1) Add Order===========================
export const  addOrder =  (req,res,next) =>{
    const {customerID , orderID , productID , quantity , unitPrice } = req.body
    const query = `INSERT into orderitems (customerID , orderID , productID , quantity , unitPrice) value ( "${customerID}","${orderID}"  , "${productID}" , "${quantity}" , "${unitPrice}") `

    connection.execute(query,(err,result) =>{
        if(err){
            return res.status(400).json({msg:"query error" , err})
        }
        if(!result.affectedRows){
            return res.status(400).json({msg:"query error" , err})
        }
        return res.status(201).json({msg:"Added Successfully"})
    })
}

// ============================== (2) Get  Order Average ===========================
export const  orderAverage =  (req,res,next) =>{
    const {orderID} = req.body
    const query = `select ROUND(AVG(quantity * unitPrice),2) as averageOrderValue from orderitems where orderID = "${orderID}"`
    connection.execute(query,(err,result) =>{
        if(err){
            return res.status(400).json({msg:"query error" , err})
        }
        return res.status(201).json(result)
    })
}

// ============================== (3) Get list of all customers who have not made any orders ===========================
export const  customersZeroOrder =  (req,res,next) =>{
    const query = `SELECT customers.id , customers.firstName , customers.lastName , customers.email ,customers.phone FROM customers LEFT JOIN orders ON orders.customerID = customers.id WHERE orders.customerID IS null `
    connection.execute(query,(err,result) =>{
        if(err){
            return res.status(400).json({msg:"query error" , err})
        }
        return res.status(201).json(result)
    })
}

// ============================== (4) Get customer who has purchased the most items ===========================
export const  customerMaxItems =  (req,res,next) =>{
    const query = `SELECT customers.id , customers.firstName , customers.lastName , customers.email , customers.phone , MAX(orderitems.quantity) as maxProductQuantity from customers INNER JOIN orderitems ON orderitems.customerID = customers.id;`
    connection.execute(query,(err,result) =>{
        if(err){
            return res.status(400).json({msg:"query error" , err})
        }
        return res.status(201).json(result)
    })
}

// ============================== (5) Get list of top 10 customers who have spend the most money ===========================
export const  customersMaxMonyPaied =  (req,res,next) =>{
    const query = `SELECT customers.id , customers.firstName , customers.lastName , customers.email , customers.phone , SUM(orderitems.quantity * orderitems.unitPrice) AS totalAmount from customers INNER JOIN orderitems ON orderitems.customerID = customers.id GROUP BY customerID ORDER BY totalAmount DESC LIMIT 10`
    connection.execute(query,(err,result) =>{
        if(err){
            return res.status(400).json({msg:"query error" , err})
        }
        return res.status(201).json(result)
    })
}

// ============================== (6) Get list of all customers who have made at least 5 orders ===========================
export const  customersG5Orders =  (req,res,next) =>{
    const query = `SELECT customers.id , customers.firstName , customers.lastName , customers.email , customers.phone , COUNT(DISTINCT orderitems.orderID) AS numberOfOrders from customers INNER JOIN orderitems ON orderitems.customerID = customers.id GROUP BY customerID HAVING numberOfOrders >= 5`
    connection.execute(query,(err,result) =>{
        if(err){
            return res.status(400).json({msg:"query error" , err})
        }
        return res.status(201).json(result)
    })
}
// ============================== (7) Get percentage of customers who have more than 1 orders ===========================
export const  percentageOfCustomers =  (req,res,next) =>{
    const query = `SELECT COUNT(id) as numberOfOrderCustomers ,(SELECT COUNT(id) FROM customers)as TotalCustomers , CONCAT(ROUND((COUNT(id)/(SELECT COUNT(id) FROM customers))*100,2) , "%") as percentage FROM customers INNER JOIN (Select orderitems.customerID, count(DISTINCT(orderitems.orderID)) as NumberOfOrders from orderitems Group by orderitems.customerID) AS o on customers.id = o.customerID WHERE NumberOfOrders > 1;`
    connection.execute(query,(err,result) =>{
        if(err){
            return res.status(400).json({msg:"query error" , err})
        }
        return res.status(201).json(result)
    })
}

// ============================== (8) Get customer who has made the earlist order ===========================
export const  customerEarlistOrder =  (req,res,next) =>{
    const query = `SELECT customers.id , customers.firstName , customers.lastName , customers.email , customers.phone , orderitems.orderDate from customers INNER JOIN orderitems ON orderitems.customerID = customers.id GROUP BY customerID ORDER BY orderitems.orderDate LIMIT 1;`
    connection.execute(query,(err,result) =>{
        if(err){
            return res.status(400).json({msg:"query error" , err})
        }
        return res.status(201).json(result)
    })
}