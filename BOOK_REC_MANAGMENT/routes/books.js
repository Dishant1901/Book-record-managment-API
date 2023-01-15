const express = require("express");

const{books}= require("../data/books.json");
const{users}= require("../data/users.json");
const router= express.Router();

/*
*route : /books
*method : GET
*description : get all books
parameters: nnonne
*/

router.get("/",(req,res)=>{
    res.status(200).json({
        sucess: true,
        data : books,
    });
});

/*
*route : /books/:id
*method : GET
*description : get books by id
parameters: id
*/

router.get("/:id",(req,res)=>{
    const {id} = req.params;
    const book = books.find((each)=>each.id===id);

    if(!book){return res.status(404).json({sucess: false,message:" book not found"});}

    res.status(200).json({
        sucess: true,
        data: book,
    })
});

/*
*route : /books
*method : POST
*description : creating a new book
parameters: none
*/

router.post("/",(req,res)=>{
    const {id,name,author,genre,price,publisher} = req.body;

    const book = books.find((each)=>each.id===id);

    if(book){
        return res.status(404).json({
            sucess: false,
            message: " book with this id already exist",
        })
    }

    books.push({
        id,
        name,
        author,
        genre,
        price,
        publisher,
    });

    res.status(200).json({
        sucess:true,
        data : books,
    });

});

/*
*route : /books/issued
*method : GET
*description : getting issued book
parameters: none
*/

router.get("/issued/by-user",(req,res)=>{
    const userWithIssuedBooks = users.filter((each)=>{
        if(each.issuedBook) return each;
    });

    const issuedbooks=[];


    // is function me books ki id (books.json) & userWithIssuedBooks me joh users k pass issued book ki id ko check kr rhe

    userWithIssuedBooks.forEach((each)=>{
        const book = books.find((book)=>book.id===each.issuedBook);

        book.issuedBy = each.name;
        book.issuedDate= each.issuedDate;
        book.returnDate= each.returnDate;

        issuedbooks.push(book);
    });

    if(issuedbooks.length===0)
    return res.status(404).json({
        sucess: false,
        message:"no book issued",
    });

    return res.status(200).json({
        sucess:true,
        data: issuedbooks,
    });
});

/*
*route : /books/:id
*method : PUT
*description : updating book by id
parameters: id
*/

router.put("/:id",(req,res)=>{
    const {id} = req.params;
    const {data} = req.body;

    const book = books.find((each)=>each.id===id);
    
    if(!book){
        return res.status(404).json({
            sucess: false,
            message:"book not found with this id",
        });
    }

    const updateData = books.map((each)=>{
        if(each.id===id){
            return {
                ...each,
                ...data
            };
        }

        return each;
    });

    return res.status(200).json({
        sucess: true,
        data: updateData,
    });
    
});

// deault export
module.exports=router;