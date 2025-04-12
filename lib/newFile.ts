import { cached } from "./mongodb";

const localCached = global.mongoose || { conn: null, promise: null };
