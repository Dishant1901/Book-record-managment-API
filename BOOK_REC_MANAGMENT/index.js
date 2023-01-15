const express = require("express");


// importing routes

const userRoutes= require("./routes/users");
const booksRoutes= require("./routes/books");

const app = express();

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