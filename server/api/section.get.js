//import upstash redis
import { Redis } from "@upstash/redis"
const redis = Redis.fromEnv();

export default defineEventHandler(async (event) => {
    //get query params


    const aperitive = await redis.hgetall('aperitive');
    const main = await redis.hgetall('main');
    const desert = await redis.hgetall('desert');
    const drinks = await redis.hgetall('drinks')

    return [aperitive, main, desert, drinks];
})
