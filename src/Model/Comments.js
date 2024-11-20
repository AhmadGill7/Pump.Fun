import mongoose from "mongoose";

const CommentsSchema = new mongoose.Schema({
        userImg: String,
        userName: String,
        time: String,
        likes: [],
        optionalImage: String,
        mainComment: String,
        tokenAddress: String,
        userID:String,
        reply:String
});

export const CommentsModel = mongoose.models.Comments || mongoose.model('Comments', CommentsSchema);
