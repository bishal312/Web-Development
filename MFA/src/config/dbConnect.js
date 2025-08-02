import mongoose, {connect} from "mongoose";

const connectDb = async()=>{
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Server connected to database: ${connect.connection.host}`);
  } catch (error) {
    console.log(`Database connection failed: ${error}`);
    process.exit(1);
  }
}

export default connectDb;