const mongoose = require("mongoose");
// Define the Token Schema
const TokenSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      default: null,
    },
    tokenAddress: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    ticker: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    file: {
      type: String,
      default: null,
    },
    twitter: {
      type: String,
      default: null,
    },
    telegram: {
      type: String,
      default: null,
    },
    website: {
      type: String,
      default: null,
    },
    walletAddress: {
      type: String,
      default: null,
      unique: false,
    },
    allComments:[],
    MarketCap:String,
    Volume:String,
  },

  {
    timestamps: true,
  }
);

const checkAndDropIndex = async () => {
  try {
    const Token = mongoose.model("Token");
    const indexes = await Token.collection.getIndexes();
    if (indexes && indexes.walletAddress_1) {
      console.log("Found walletAddress_1 index, dropping it...");
      await Token.collection.dropIndex("walletAddress_1");
      console.log("Successfully dropped walletAddress_1 index");
    }
  } catch (error) {
    console.log("Error in index management:", error);
  }
};

const Token = mongoose.models.Token || mongoose.model("Token", TokenSchema);

if (mongoose.connection.readyState === 1) {
  checkAndDropIndex();
}

module.exports = Token;
