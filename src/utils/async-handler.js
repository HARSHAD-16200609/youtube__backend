

 const async_handler =  (request_handler)=>async (res,req,next)=>{
  
    try{
        await request_handler(req,res,next)
        
    }
    catch(error)
    {
        console.log(`ERROR : ${error}`);
res.status(err.code).json({
    sucess:false,
    message:err.message
})        
    }
 }

 const async__handler = (request_handler)=>{

    return (res,req,next)=> {
        Promise.resolve(request_handler(req,res,next)).catch((err)=>{next(err)}
    )

    }
 }

 export {async_handler}