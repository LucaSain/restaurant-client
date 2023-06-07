import redis from "~/utils/redis";

export default defineEventHandler(async (event) => {
    const id = await redis.get("orderId");
    await redis.incr("orderId");
    return id;
})
