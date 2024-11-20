import dbConnect from "@/dbConnect";
import Token from "@/Model/Tokens";

export async function GET(req) {
  await dbConnect();

  const url = new URL(req.url);
  const page = parseInt(url.searchParams.get("page")) || 1;
  const limit = parseInt(url.searchParams.get("limit")) || 15;
  const skip = (page - 1) * limit;

  try {
    // Get total count with a separate countDocuments query
    const totalTokens = await Token.countDocuments();

    // Fetch only the required documents using skip and limit
    const tokens = await Token.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const response = {
      data: tokens,
      totalPages: Math.ceil(totalTokens / limit),
      currentPage: page,
      totalTokens,
    };

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching tokens:", error);
    return new Response(
      JSON.stringify({
        data: [],
        totalPages: 1,
        currentPage: 1,
        error: "Failed to fetch tokens",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
