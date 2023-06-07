import redis from "~/utils/redis";

export default defineEventHandler(async (event) => {

    const aperitive = await redis.hgetall('aperitive');
    const main = await redis.hgetall('main');
    const desert = await redis.hgetall('desert');
    const drinks = await redis.hgetall('drinks')

    return [aperitive, main, desert, drinks];
})
