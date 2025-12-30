import mongoose from "mongoose";
import { Video } from "../models/video.model.js";
import { Subscription } from "../models/subscription.model.js";
import { Like } from "../models/like.model.js";
import { API_Error } from "../utils/Api_error.js";
import { Api_Response } from "../utils/Api_Response.js";
import { async_handler } from "../utils/async-handler.js";

const getChannelStats = async_handler(async (req, res) => {
    // TODO: Get the channel stats like total video views, total subscribers, total videos, total likes etc.
});

const getChannelVideos = async_handler(async (req, res) => {
    // TODO: Get all the videos uploaded by the channel
    const userId = req.user._id;

    const totalVideos = await Video.aggregate([
        {
            $match: {
                owner: userId,
            },
        },
        {
            $lookup: {
                from: "users",
                localField: "owner",
                foreignField: "_id",
                as: "Owner",
                pipeline: [
                    {
                        $project: {
                            username: 1,
                            avatar: 1,
                        },
                    },
                    
                ],
            },
        },
        {
            $project:{
                Owner:1,
                videoFile:1,
                thumbnail:1,
                title:1,
                duration:1,
                views:1,
                isPublished:1,
                createdAt:1
            }
        },{$unwind:"$Owner"}
        
    ]);

    return res.status(200).json(totalVideos);
});

export { getChannelStats, getChannelVideos };
