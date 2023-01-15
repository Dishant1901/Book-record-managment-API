const express=require("express");

const { users } = require("../data/users.json");

const router= express.Router();



/*
*route : /users
*method : GET
*description : get sll users
*/

router.get("/",(req,res)=>{
    res.status(200).json({
        sucess: true,
        data: users,
    });
})

/*
*route : /users/:id
*method : GET
*description : get sinngle user by id
parametres: id
*/
router.get("/:id",(req,res) =>{
    const {id} =req.params;
    const user = users.find((each)=> each.id===id);
    if(!user){
        return res.status(404).json({
            sucess : false,
            message: "user not found  ",
        });
    }

    
    res.status(200).json({
        sucess: true,
        data:  user,
    });                                  
});

/*
*route : /users
*method : POST
*description : creating a neq user
parametres: none
*/
router.post('/',(req,res)=>{
    const {id,name,surname,email,subscriptionType,subscriptionDate} =  req.body;
    
    const user = users.find((each)=> each.id===id);
    
    if(user){
        return res.status(404).json({
            sucess : false,
            message: "user already exist with this data",
        });
    }

    users.push({
        id,
        name ,
        surname,
        email,
        subscriptionType,
        subscriptionDate,  });

    return res.status(201).json({
        sucess:true,
        data : users,
    });
    
});


/*
*route : /users/:id
*method : PUT
*description : updating a user by id
parametres: id
*/

router.put('/:id',(req,res)=>{

    const {id} = req.params;
    const {data} = req.body;

    const user = users.find((each)=> each.id===id);

    if(!user){
        return res.status(404).json({ sucess: false, message: "user with this dosent exist",
        });
    }

    const updatedUser= users.map((each)=>{
        if (each.id===id){
            return{
                ...each,
                ...data,
            };
        }

        return each;

    });

    return res.status(200).json({
        sucess:true,
        data: updatedUser,
    });

});

/*
*route : /users/:id
*method : DELETE
*description : deletin a user by id
parametres: id
*/

router.delete('/:id',(req,res)=>{

    const {id}= req.params;
    const user = users.find((each)=>each.id===id);

    if(!user){
        return res.status(404).json({
            sucess:true,
            message: "user to be deleted is not founnd",
        });
    }

    const index  = users.indexOf(user);
    users.splice(index,1);

    return res.status(200).json({sucess:true,data:users});

});

/*
*route : /users/subscription/:id
*method : GET
*description : get user subscription details based on id
parametres: id
*/

router.get("/subscription-details/:id",(req,res)=>{
    const {id}=req.params;

    const user = users.find((each)=> each.id===id);

    if(!user){
        return res.status(404).json({
            sucess: false,
            message: " user not found with this id",
        });
    }
    
    const getDateinDays = (data="")=>{
        let date;
        // ifcurrent date
        if(date===""){
            date=new Date();
        }
        else {
            date = new Date(data);
        }

        let days = Math.floor(date/(1000 *60 *60 * 24 ));
        console.log("days value is:  ",days);
        return days;

        
    };

  

    const subscriptionType= (date)=>{
        if(user.subscriptionType==="Basic"){
            date= date+90;
        } else if (user.subscriptionType==="Standard"){
            date=date +180;
        }else if (user.subscriptionType==="Premuim"){
            date=date +365;
        }
        return date;
    }

    let returnDate=getDateinDays(user.returnDate);
    let currentDate = getDateinDays();
    let subscriptionDate= getDateinDays(user.subscriptionDate);
    let expirationDtae = subscriptionType(subscriptionDate);

    // console.log("return date is: ", returnDate);
    // console.log("current date is :", currentDate);
    // console.log("subscription date is:  ",subscriptionDate);
    // console.log("expiration date is: ", expirationDtae);

    const data = {
        ...user,
        subscriptionExpired: expirationDtae<currentDate,
         daysLeftorExpiration:
          expirationDtae<= currentDate
           ? 0 
           : expirationDtae-currentDate,
        Fine:
            returnDate<currentDate? expirationDtae <= currentDate
                ?200
                :100
            :0,

    };

    res.status(200).json({
        sucess: true,
        data,
    });

});



module.exports= router;