import mongoose from "mongoose"

// Add type declaration for global mongoose
declare global {
  var mongoose: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  } | undefined;
}

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable")
}

// Initialize cached here - this was missing
export let cached = global.mongoose || { conn: null, promise: null };

if (global.mongoose === undefined) {
  global.mongoose = cached;
}

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    }

    cached.promise = mongoose.connect(MONGODB_URI!, opts)
  }

  try {
    cached.conn = await cached.promise
    console.log("MongoDB connected successfully")
    return cached.conn
  } catch (e) {
    cached.promise = null
    console.error("MongoDB connection error:", e)
    throw e
  }
}