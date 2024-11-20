import dbConnect from "@/dbConnect";
import Token from "@/Model/Tokens";
import { NextResponse } from "next/server";

// Ensure database connection
await dbConnect();

export async function POST(req) {
    try {
        const data = await req.json();
        const { commentID, tokenAddress, userId } = data;

        // Find the token document by tokenAddress
        const commentedToken = await Token.findOne({ tokenAddress });

        if (!commentedToken) {
            return NextResponse.json({
                success: false,
                message: "Token not found."
            });
        }

        // Find the specific comment by ID
        const comment = commentedToken.allComments.find(
            tokensData => tokensData._id.toString() === commentID
        );

        if (!comment) {
            return NextResponse.json({
                success: false,
                message: "Comment not found."
            });
        }

        // Check if user has already liked the comment
        const existingLikeIndex = comment.likes.findIndex(
            like => like.userid === userId
        );

        if (existingLikeIndex !== -1) {
            comment.likes.splice(existingLikeIndex, 1);
            commentedToken.markModified('allComments');

            await commentedToken.save();
            return NextResponse.json({
                success: true,
                message: "Like removed from comment.",
                likes: comment.likes
            });
        } else {
            comment.likes.push({userid: userId});
            commentedToken.markModified('allComments');

            await commentedToken.save();
            return NextResponse.json({
                success: true,
                message: "Like added to comment.",
                likes: comment.likes
            });
        }
    } catch (error) {
        console.error("Error saving data:", error);
        return NextResponse.json({
            success: false,
            message: "An error occurred while saving the data."
        });
    }
}
