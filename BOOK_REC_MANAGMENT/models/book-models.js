const mongoose= require('mongoose');

const schema=mongoose.Schema;
const bookSchema = new schema(
    {
        name:{
            type: String,
            required: true,
        },
        author:{
            type:String,
            required:true,
        },
        genre:{
            type:String,
            required: true,
        },
        price:{
            type: Number,
            required: true,
        },
        publisher:{
            type: String,
            required: true,
        },

    },
    {
        timestamps:true,
    }
);
// a collection will have name "books"
// it willautomatically be converted into prural & lowercase
module.exports= mongoose.model("Book",bookSchema);