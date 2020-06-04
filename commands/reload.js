exports.run = (client, message, args, ops) => {
    // Permission checks for owner
    if (message.author.id !== ops.ownerID) return message.channel.send('Unauthorised, becaused I sold my soul to @Nishat!');

    // Delete from cache
    try {
        delete require.cache[require.resolve(`./${args[0]}.js`)];
    } catch (e) {
        return message.channel.send(`I'm bleeding to death for ${args[0]}`);
    }

    // Successful reload
    message.channel.send(`I've finished digging grave for reload of ${args[0]}`);
}