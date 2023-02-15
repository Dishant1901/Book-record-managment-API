const express = require("express");
const dotenv= require('dotenv');
// data base Connection
const DBConnection= require("./databaseConnection");
// importing routes
const userRoutes= require("./routes/users");
const booksRoutes= require("./routes/books");
dotenv.config();

const app = express();
DBConnection();

const PORT = 8081;

app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({
        message: "server is running",
    });
});

app.use("/users",userRoutes);
app.use("/books", booksRoutes);

app.get("*",(req,res)=>{
    res.status(404).json({
        message: "THIS ROUTE DOSE NOT EXIST",
    });
});

app.listen(PORT,()=>{
    console.log(`server is running at port ${PORT}`);
});