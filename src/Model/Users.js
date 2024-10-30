const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    walletAddress: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      sparse: true,
      unique: true,
    },
    name: {
      type: String,
      default: null,
      require: true,
    },
    bio: {
      type: String,
      default: null,
      require: true,

    },
    otp: {
      type: String,
      default: null,
    },
    image: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const checkAndDropIndex = async () => {
  try {
    const User = mongoose.model("User");
    const indexes = await User.collection.getIndexes();
    if (indexes && indexes.email_1) {
      console.log("Found email_1 index, dropping it...");
      await User.collection.dropIndex("email_1");
      console.log("Successfully dropped email_1 index");
    }
  } catch (error) {
    console.log("Error in index management:", error);
  }
};

const User = mongoose.models.User || mongoose.model("User", UserSchema);

if (mongoose.connection.readyState === 1) {
  checkAndDropIndex();
}

module.exports = User;
