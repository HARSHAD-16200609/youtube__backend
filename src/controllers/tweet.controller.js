import { Tweet } from "../models/tweet.model.js";
import { API_Error } from "../utils/Api_error.js";
import {async_handler}  from "../utils/async-handler.js"
import {Api_Response} from "../utils/Api_Response.js"


const createTweet = async_handler(async (req, res) => {
    //TODO: create tweet
   
    
   const content = req.body.content;
   const userId  = req.user?._id;
   if(!userId) throw new API_Error(401,"Unauthorized Access")
   if(!content || content.trim().length===0) throw new API_Error(400,"Please enter some content tweet can't be empty!!!")
            
    const tweetResponse = await Tweet.create({
        content:content,
        owner:userId
    })
 
    if(!tweetResponse) return res.status(500).json(new API_Error(500,"Internal Server Error: Failed to generate the Tweet"))

    return res.status(201).json(new Api_Response (201,tweetResponse,"Tweet generated suceesfully"))

})

const getUserTweets = async_handler(async (req, res) => {
    // TODO: get user tweets
})

const updateTweet = async_handler(async (req, res) => {
    //TODO: update tweet
})

const deleteTweet = async_handler(async (req, res) => {
    //TODO: delete tweet
})

export {
    createTweet,
    getUserTweets,
    updateTweet,
    deleteTweet
}