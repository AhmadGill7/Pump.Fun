import mongoose from "mongoose";

const dbConnect = async () => {
  if (mongoose.connection.readyState >= 1) return;

  return mongoose.connect('mongodb+srv://mw951390:1234@cluster0.xxofs0k.mongodb.net/New-Pump', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

export default dbConnect;

