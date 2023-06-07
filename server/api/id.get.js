//import upstash redis
import { Redis } from "@upstash/redis"
const redis = Redis.fromEnv();

export default defineEventHandler(async (event) => {
    const id = await redis.get("orderId");
    await redis.incr("orderId");
    return id;
})
