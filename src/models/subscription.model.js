import {Schema} from "mongoose"


const subscriptionSchema= new Schema({
    subscribers:{
        type:Schema.Types.ObjectId, // subcribers of respecitive channel
        ref:"User"
    },
    channel:{
        type:Schema.Types.ObjectId, // channel on videotube 
        ref:"User"
    }
},{timestamps:true })

const Subscription = mongoose.model("Subscription",subscriptionSchema)

export {Subscription}