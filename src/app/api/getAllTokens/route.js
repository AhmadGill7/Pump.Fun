import dbConnect from "@/dbConnect";
import Token from "@/Model/Tokens";
import { NextResponse } from "next/server";


dbConnect()


export async function POST (){
    let AllTokens = await Token.find()

    return NextResponse.json({
        AllTokens
    })
}