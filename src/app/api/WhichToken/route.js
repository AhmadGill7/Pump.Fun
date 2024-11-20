import Token from "@/Model/Tokens";
import { NextResponse } from "next/server";

const { default: dbConnect } = require("@/dbConnect");


dbConnect();

export async function POST (req) {
    let data = await req.json();

    let TokenDetail = await Token.findOne({tokenAddress:data.tokenAddress})

    return NextResponse.json({
        TokenDetail
    })
}