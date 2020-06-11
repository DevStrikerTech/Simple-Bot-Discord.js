const fs = require('fs');
const { MessageEmbed } = require("discord.js");


exports.run = (client, messsage, args) => {
    if (messsage.channel.id === '720621595588165692') {
        fs.readFile('guilds.json', (err, data) => {
            if (err) throw err;
            let newString = JSON.parse(data);

            const names = Object.keys(newString)
            const count = Object.values(newString)

            let descriptionData = '';
            let joinData = names.map((name, i) => {
                return {
                    'name': name,
                    'count': count[i]['messageCount']
                }
            })

            const compare = (item, item2) => {
                if (item.count < item2.count) return 1;
                return -1;
            }

            joinData = joinData.sort(compare)
            

            joinData.map((item, i) => {
                descriptionData += `${i+1}. ${item.name} - ${item.count} messages.\n`
            })

            const leaderboardEmbed = new MessageEmbed()

            .setTitle('Weekly Message Contest Leaderboard')
            .setDescription(descriptionData)
            .setColor('RANDOM')

            messsage.channel.send(leaderboardEmbed)
        });     
    }
}