import redis from "~/utils/redis";

export default defineEventHandler(async (event) => {
    //get query params
    const query = await getQuery(event)

    return await redis.hgetall(query.id);
})
