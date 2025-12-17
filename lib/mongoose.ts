import mongoose, { Mongoose } from "mongoose";
const MONGODB_URI = process.env.MONGODB_URI as string;

//*If you just write mongoose.connect() directly in your file, every time you save a file or an API route is hit, your app will create a new connection. Eventually, you will crash the database with "Too Many Connections."
if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is not define");
}
interface MongooseCache {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}
//*2. The "Global Shelf" (The Hack)
//*We attach our connection variable to the global object. The global object is specific to Node.js and sits "outside" your file. It survives the hot reloads.
declare global {
  var mongoose: MongooseCache;
}
let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}
const dbConnect = async (): Promise<Mongoose> => {
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, { dbName: "devflow" })
      .then((result) => {
        console.log("done");
        return result;
      })
      .catch((error) => {
        console.log("not connect");
        throw error;
      });
  }
  cached.conn = await cached.promise;
  return cached.conn;
};
export default dbConnect;
