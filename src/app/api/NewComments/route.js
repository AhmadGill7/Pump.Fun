import dbConnect from "@/dbConnect";
import { CommentsModel } from "@/Model/Comments";
import Token from "@/Model/Tokens";
import { NextResponse } from "next/server";

export async function POST(req) {
    const data = await req.formData();

    await dbConnect();

    if(data.get('userImage') == 'undefined'){
        data.set('userImage', '')
    }else if(data.get('userImage') == 'null' || data.get('userImage') == null){
        data.set('userImage', '')
    }

    const CommentsData = new CommentsModel({
            userImg: data.get('userImage') || '',
            userName: data.get('userName'),
            time: data.get('time'),
            likes: [],
            optionalImage: data.get('userOptImage') || null,
            mainComment: data.get('mainComment'),
            tokenAddress: data.get('Tokenaddress') || null,
            userID:data.get('userID'),
            reply:data.get('replyID')
    });



    try {
        const comment = await CommentsData.save();
        let allcomments  = await Token.findOne({ tokenAddress: data.get('Tokenaddress') })
        allcomments.allComments.push(comment)
        await allcomments.save()
        
        return NextResponse.json({
            success: true,
            comment
        });
    } catch (error) {
        console.error("Error creating comment:", error);
        return NextResponse.json({
            success: false,
            error: error.message
        });
    }
}
