import dbConnect from "@/dbConnect";
import Token from "@/Model/Tokens";

export async function GET(req) {
    await dbConnect();

    try {
        // Fetch the latest token
        const latestToken = await Token.findOne().sort({ createdAt: -1 }); // Get the latest token by createdAt

        if (!latestToken) {
            return new Response(JSON.stringify({
                message: 'No tokens available.'
            }), {
                status: 404,
                headers: { "Content-Type": "application/json" }
            });
        }

        // Calculate the time difference
        const createdAt = new Date(latestToken.createdAt);
        const now = new Date();
        const timeDiffMinutes = Math.floor((now - createdAt) / 60000);

        let timeAgo;
        if (timeDiffMinutes < 60) {
            timeAgo = `${timeDiffMinutes} min`;
        } else if (timeDiffMinutes < 1440) { // Less than 24 hours (1440 minutes)
            const hours = Math.floor(timeDiffMinutes / 60);
            const minutes = timeDiffMinutes % 60;
            timeAgo = `${hours} hr${hours > 1 ? 's' : ''} ${minutes} min`;
        } else {
            const days = Math.floor(timeDiffMinutes / 1440); // Calculate days
            const remainingMinutes = timeDiffMinutes % 1440;
            const hours = Math.floor(remainingMinutes / 60); // Calculate hours
            timeAgo = `${days} day${days > 1 ? 's' : ''} ${hours} hr${hours > 1 ? 's' : ''}`;
        }

        return new Response(JSON.stringify({
            token: latestToken,
            timeAgo // Add the time difference in minutes, hours, or days as applicable
        }), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });
    } catch (error) {
        console.error("Error fetching latest token:", error);
        return new Response(JSON.stringify({
            error: 'Failed to fetch the latest token'
        }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
}
