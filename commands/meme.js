const { MessageEmbed } = require("discord.js");
const api = require("imageapi.js");

module.exports = {
    name: "meme",
    description: "Get a meme!",
    category: "fun",

    run: async (client, message, args) => {
        let subreddits = [
            "comedyheaven",
            "dank",
            "meme",
            "memes"
        ]
        
        let subreddit = subreddits[Math.floor(Math.random()*(subreddits.length)-1)]

        let img = await api(subreddit)

        const memeEmbed = new MessageEmbed()
        .setTitle(`A new meme from my grave r/{${subreddit}}`)
        .setURL(`https://reddit.com/r/${subreddit}`)
        .setColor('RANDOM')
        .setImage(img)

        message.channel.send(memeEmbed)
    }
}