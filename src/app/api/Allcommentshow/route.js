import dbConnect from "@/dbConnect";
import Token from "@/Model/Tokens";
import { NextResponse } from "next/server";

export async function POST(req) {
    let data = await req.json();

    await dbConnect();
        let Newdata = await Token.findOne({ tokenAddress: data.tokenAddress})
        return NextResponse.json({
            Newdata
        });
    }

