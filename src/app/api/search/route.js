import { NextResponse } from 'next/server';
import dbConnect from "@/dbConnect";
import Token from '@/Model/Tokens';

export async function POST(req) {
  try {
    // Connect to the database
    await dbConnect();

    // Parse the request body
    const requestBody = await req.json();
    const { searchQuery } = requestBody || {};

    console.log("Search Query:", searchQuery);

    // If a search query is provided, search by token name. Otherwise, fetch all tokens.
    const query = searchQuery
      ? { name: { $regex: searchQuery, $options: "i" } } // Case-insensitive match
      : {}; // Empty object returns all tokens


    // If no query is provided, return an empty array immediately
    if (!query) {
      return NextResponse.json({ tokens: [] });
    }

    // Query the database
    const results = await Token.find(query);

    console.log("Results:", results);

    // Return the tokens or an empty array if no tokens are found
    return NextResponse.json({ tokens: results });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
