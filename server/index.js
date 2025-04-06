const sequelize = require("./database/database_connection");  ///Every time the database module is imported, the connection is validated.
const express = require("express");
const routers = require("./routes/userRoutes")
const app = express();    ///to initialize express

////MIDDLEWARES //Middleware functions are functions that have access to the request (req), response (res)
app.use(express.json()); // Middleware to parse incoming JSON request bodies
const cors = require("cors");
app.use(cors());
///ROUTES (ALSO MIDDLEWARES) //
app.use("/api/v1/" , routers)  ///Any request with a path starting with /api/v1/students will be passed to the router object.


/////TEST ROUTE/////
app.get("/test",(req,res)=>{
    res.status(200).send('<h1>hi k km  m</h1>')
})

port = 3000;
app.listen(port,()=>{
    console.log(`successfully connected to ${port}`);
})




