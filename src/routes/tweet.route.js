import Router from "express"
import {createTweet} from "../controllers/tweet.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"
const tweetRouter = Router()

tweetRouter.use(verifyJWT)

tweetRouter.route("/createTweet").post(createTweet)






export default tweetRouter