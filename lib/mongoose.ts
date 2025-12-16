import mongoos, { Mongoose } from "mongoose";
const MONGODB_URI = process.env.MONGODB_URI as string | null;
if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is not define");
}
interface MongooseCache {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}
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
    cached.promise = mongoos
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
