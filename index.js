import express from 'express'
import customersRoute from './src/modules/customers/customers.routes.js'
import productsRoute from './src/modules/products/products.routes.js'
import ordersRoute from './src/modules/orders/orders.routes.js'
import connection from './db/connectDB.js'
import cors from 'cors'
const app = express()
const port = process.env.port || 3000
connection

const corsConfig = {
    origin: "*",
    credential: true,
    methouds : ["GET" , "POST" , "PUT" , "DELETE"],
};
app.options("" , cors(corsConfig))

app.use(cors())
app.use(express.json())
app.use("/customers",customersRoute)
app.use("/products",productsRoute)
app.use("/orders",ordersRoute)

app.get("/",(req,res)=>{
    res.status(200).json({
        message:"Hello on my project"
    })
})

app.use("*",(req,res)=>{
    res.status(404).json({
        message:"Page Not Found"
    })
})

app.listen(port, () => console.log(`your app is running... ${port}!`))