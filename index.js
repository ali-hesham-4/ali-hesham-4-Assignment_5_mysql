import express from 'express'
import customersRoute from './src/modules/customers/customers.routes.js'
import productsRoute from './src/modules/products/products.routes.js'
import ordersRoute from './src/modules/orders/orders.routes.js'
import connection from './db/connectDB.js'
const app = express()
const port = process.env.port || 3000
connection
app.use(express.json())
app.use("/customers",customersRoute)
app.use("/products",productsRoute)
app.use("/orders",ordersRoute)

app.use("/",(req,res)=>{
    res.status(200).json({
        message:"Hello in my project"
    })
})

app.use("*",(req,res)=>{
    res.status(404).json({
        message:"Page Not Found"
    })
})

app.listen(port, () => console.log(`your app is running... ${port}!`))