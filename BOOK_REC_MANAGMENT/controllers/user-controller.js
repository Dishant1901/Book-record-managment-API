const {UserModel ,BookModel} = require ('../models');

exports.getAllUsers = async (req,res)=>{

        const users = await UserModel.find();

        if(users.length===0){
            return res.status(404).json({
                sucess:false,
                message: 'no users found :(',
            })
        }
    
        res.status(200).json({
            sucess: true,
            message:"MODIFED!!!!!!!!!!!!!",
            data: users,
        });
    
};     

exports.getSingleUserById= async (req,res)=>{
    const {id} =req.params;

    const user = await UserModel.findById(id);

    if(!user){
        return res.status(404).json({
            sucess : false,
            message: "user not found  ",
        });
    }

    return res.status(200).json({
        sucess: true,
        data: user,
    });
};

exports.deleteUser = async(req,res) =>{

        const {id}= req.params;
        const user = UserModel.deleteOne(id);
    
        if(!user){
            return res.status(404).json({
                sucess:true,
                message: "user to be deleted is not founnd",
            });
        }
    
        
    
        return res.status(200).json({
            sucess:true,
            message: 'user deleted sucessfully',
        });   
};

exports.updateUserById = async (req,res)=>{

    const {id} = req.params;
    const {data} = req.body;

    const user =  await UserModel.findOneAndUpdate({
        _id:id ,  
    },
    {
        // here,it means if a field is not present then add it
        $set:{
            ...data,
        }
    },
    {
        new:true,
    })

    if(!user){
        return res.status(404).json({ sucess: false, message: "user with this dosent exist",
        });
    }

    return res.status(200).json({
        sucess:true,
        data: user,
    });

};

exports.createNewUser = async (req,res)=>{
    const {data} =  req.body;
    const newUser= await UserModel.create(data);

    return res.status(201).json({
        sucess:true,
        data : newUser,
    });
};

exports.getSubscriptionDetailsById = async (req,res)=>{
    const {id}=req.params;

    const user = await UserModel.findById(id);

    if(!user){
        return res.status(404).json({
            sucess: false,
            message: " user not found with this id",
        });
    }
    
    const getDateinDays = (data="")=>{
        let date;
        // ifcurrent date
        if(data===""){
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

    console.log("return date is: ", returnDate);
    console.log("current date is :", currentDate);
    console.log("subscription date is:  ",subscriptionDate);
    console.log("expiration date is: ", expirationDtae);

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

};