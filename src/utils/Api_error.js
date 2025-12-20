class API_Error extends Error {


    constructor(
        StatusCode
        ,err_msg = "Something went wrong" 
        ,errors=[],
        stack=""
    )
        {
        
      super(err_msg)
       this.StatusCode=StatusCode;
       this.message=err_msg;
       this.success=false;
       this.errors=errors;
    }
}

export  {API_Error}