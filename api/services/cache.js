let cache = {};
var redis = require('redis');
var client = redis.createClient(6379, '127.0.0.1');

client.on('connect', () => {
    console.log('Redis client connect!');
});
client.on('error', (err) => {
    console.log('Something went wrong ' + err)
});

cache.get = async (key) => {
    return new Promise((resolve, reject) => {
        client.get(key, (err, reply) => {
            if (err) return reject(err);
            resolve(safeParse(reply));
        })
    })
}
cache.set = async (key, val) => {
    client.set(key, JSON.stringify(val));
}
module.exports = cache;
function safeParse(text) {
    try {
        if (!text) return text;
        return JSON.parse(text);
    } catch (err) {
        return null;
    }
}