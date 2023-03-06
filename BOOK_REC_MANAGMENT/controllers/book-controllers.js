const {UserModel,BookModel}=require("../models/index");

const IssuedBook =require('../dtos/book.dto');

exports.getAllBooks = async(req, res)=> {
    const books=await BookModel.find();

    if(books.length===0)
        return res.status(404).json({
            sucess: false,
            message: " book not found",
        });

    res.status(200).json({
        sucess: ture,
        data: books,
    });
    
};

exports.getSingleBookById =async (req,res) =>{
    
        const {id} = req.params;
        const book = await BookModel.findById(id);
    
        if(!book){return res.status(404).json({sucess: false,message:" book not found"});}
    
        res.status(200).json({
            sucess: true,
            data: book,
        });
};

exports.getAllIssuedBooks = async (req,res) => {
    
        const users = await UserModel.find({
            issuedBook: {$exists : true},
        }).populate("issuedBook");
    
        const IssuedBooks = users.map((each)=> new IssuedBook(each));
        

        if(issuedbooks.length===0)
        return res.status(404).json({
            sucess: false,
            message:"no book issued",
        });
    
        return res.status(200).json({
            sucess:true,
            data: issuedbooks,
        });
    };