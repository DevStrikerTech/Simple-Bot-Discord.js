// Import discord token
require("dotenv").config();
require('events').EventEmitter.prototype._maxListeners = 10000;

const fs = require('fs'); // fs is the built-in Node.js file system module.
const guilds = require('./guilds.json'); // This path may vary.

// Import translator api
const translator = require("@vitalets/google-translate-api");

// Import Discord.js
const { Client, MessageEmbed } = require('discord.js');

// Create instance of Bot
const client = new Client({ partials: ['MESSAGE', 'REACTION']});

// Set prefix
const prefix = "+";

// Add it in the future 
const ownerID = '265894345012412418';

// Message Count
client.on('message', message => {
// If the author is NOT a bot...
  if (!message.author.bot) {
      if (message.channel.id === '699974293567832085') {
            // If the guild isn't in the JSON file yet, set it up.
            if (!guilds[message.author.tag]) guilds[message.author.tag] = { messageCount: 1 };
            // Otherwise, add one to the guild's message count.
            else guilds[message.author.tag].messageCount++;

            // Write the data back to the JSON file, logging any errors to the console.
            try {
            fs.writeFileSync('./guilds.json', JSON.stringify(guilds)); // Again, path may vary.
            } catch(err) {
            console.error(err);
            }
        }
  }
});

// Starboard add reaction
client.on('messageReactionAdd', async (reaction, user) => {
  const handleStarboard = async () => {
      const starboard = client.channels.cache.find(channel => channel.name.toLowerCase() === '🌠┃starboard');
      const msgs = await starboard.messages.fetch({ limit: 100 });
      const existingMsg = msgs.find(msg => 
          msg.embeds.length === 1 ?
          (msg.embeds[0].footer.text.startsWith(reaction.message.id) ? true : false) : false);
      if(existingMsg) existingMsg.edit(`${reaction.count} - 🌟`);
      else {
          try {
            const embed = new MessageEmbed()
                .setAuthor(reaction.message.author.tag, reaction.message.author.displayAvatarURL())
                .addField('Message Channel', reaction.message.url)
                .setDescription(reaction.message.content)
                .setImage(reaction.message.attachments.array()[0].attachment)
                .setColor('RANDOM')
                .setFooter(reaction.message.id + ' - ' + new Date(reaction.message.createdTimestamp));
            if(starboard)
                starboard.send('1 - 🌟', embed);

          } catch (err) {
            const embed = new MessageEmbed()
                .setAuthor(reaction.message.author.tag, reaction.message.author.displayAvatarURL())
                .addField('Message Channel', reaction.message.url)
                .setDescription(reaction.message.content)
                .setColor('RANDOM')
                .setFooter(reaction.message.id + ' - ' + new Date(reaction.message.createdTimestamp));
            if(starboard)
                starboard.send('1 - 🌟', embed);
          }
          
      }
  }
  if(reaction.emoji.name === '🌟') {
      if(reaction.message.channel.name.toLowerCase() === '🌠┃starboard') return;
      if(reaction.message.partial) {
          await reaction.fetch();
          await reaction.message.fetch();
          handleStarboard();
      }
      else
          handleStarboard();
  }
});

// Starboard remove reaction
client.on('messageReactionRemove', async (reaction, user) => {
  const handleStarboard = async () => {
      const starboard = client.channels.cache.find(channel => channel.name.toLowerCase() === '🌠┃starboard');
      const msgs = await starboard.messages.fetch({ limit: 100 });
      const existingMsg = msgs.find(msg => 
          msg.embeds.length === 1 ? 
          (msg.embeds[0].footer.text.startsWith(reaction.message.id) ? true : false) : false);
      if(existingMsg) {
          if(reaction.count === 0)
              existingMsg.delete({ timeout: 2500 });
          else
              existingMsg.edit(`${reaction.count} - 🌟`)
      };
  }
  if(reaction.emoji.name === '🌟') {
      if(reaction.message.channel.name.toLowerCase() === '🌠┃starboard') return;
      if(reaction.message.partial) {
          await reaction.fetch();
          await reaction.message.fetch();
          handleStarboard();
      }
      else
          handleStarboard();
  }
});

// Translation add reaction
client.on('messageReactionAdd', async (reaction, user) => {
  const handleStarboard = async () => {
      const starboard = client.channels.cache.find(channel => channel.name.toLowerCase() === '🌐┃translator');
      const msgs = await starboard.messages.fetch({ limit: 100 });
      const existingMsg = msgs.find(msg => 
          msg.embeds.length === 1 ?
          (msg.embeds[0].footer.text.startsWith(reaction.message.id) ? true : false) : false);
      if(existingMsg) existingMsg.edit(`${reaction.count} - 🇬🇧`);
      else {
        let sample = await translator(`${reaction.message.content}`, {to: "en"}).then(res => {
          return res.text;
          });

          const embed = new MessageEmbed()
              .setAuthor(reaction.message.author.tag, reaction.message.author.displayAvatarURL())
              .addField('Translated Message', sample)
              .setDescription(reaction.message.content)
              .setColor('RANDOM')
              .setFooter(reaction.message.id + ' - ' + new Date(reaction.message.createdTimestamp));
          if(starboard)
              starboard.send('1 - 🇬🇧', embed);
      }
  }
  if(reaction.emoji.name === '🇬🇧') {
      if(reaction.message.channel.name.toLowerCase() === '🌐┃translator') return;
      if(reaction.message.partial) {
          await reaction.fetch();
          await reaction.message.fetch();
          handleStarboard();
      }
      else
          handleStarboard();
  }
});

// Starboard remove reaction
client.on('messageReactionRemove', async (reaction, user) => {
  const handleStarboard = async () => {
      const starboard = client.channels.cache.find(channel => channel.name.toLowerCase() === '🌐┃translator');
      const msgs = await starboard.messages.fetch({ limit: 100 });
      const existingMsg = msgs.find(msg => 
          msg.embeds.length === 1 ? 
          (msg.embeds[0].footer.text.startsWith(reaction.message.id) ? true : false) : false);
      if(existingMsg) {
          if(reaction.count === 0)
              existingMsg.delete({ timeout: 2500 });
          else
              existingMsg.edit(`${reaction.count} - 🇬🇧`)
      };
  }
  if(reaction.emoji.name === '🇬🇧') {
      if(reaction.message.channel.name.toLowerCase() === '🌐┃translator') return;
      if(reaction.message.partial) {
          await reaction.fetch();
          await reaction.message.fetch();
          handleStarboard();
      }
      else
          handleStarboard();
  }
});

client.on('message', message => {
   // Delete message for specific channel
   if (message.channel.id === '711273912708890674') {
    if (!message.content.startsWith('.') && message.author.id !== '607565641242771477') {
      message.delete();
    }
  }

  // Add number to member voice channel
  client.on('guildMemberAdd', member => {
    let myServer =  client.guilds.cache.get('699963943082524705');
    let memberCount = myServer.memberCount;

    let memberCounterChannel = myServer.channels.cache.get('717388534561898597');
    memberCounterChannel.setName('Members: ' + memberCount)
  });

  // Remove number from member voice channel
  client.on('guildMemberRemove', member => {
    let myServer =  client.guilds.cache.get('699963943082524705');
    let memberCount = myServer.memberCount;

    let memberCounterChannel = myServer.channels.cache.get('717388534561898597');
    memberCounterChannel.setName('Members: ' + memberCount)
  });
  
  // Handle all the commands 
  let args = message.content.slice(prefix.length).trim().split(' ');
  let cmd = args.shift().toLowerCase();

  // Return statements
  if (message.author.bot) return; // Ignore other bots
  if (!message.content.startsWith(prefix)) return; // triggered when prefix is not used

  // Command handler
  try {
    // Hot reload
    delete require.cache[require.resolve(`./commands/${cmd}.js`)];

    // Options
    let ops = {
      ownerID: ownerID
    }

    // Command folder
    let commandFile = require(`./commands/${cmd}.js`);
    commandFile.run(client, message, args, ops);

  } catch (e) {
    console.log(e.stack);
  }

});

// Ready event
client.on('ready', () => {
    console.log('Bot is online!')
    let myServer =  client.guilds.cache.get('699963943082524705');
    let memberCount = myServer.memberCount;

    let memberCounterChannel = myServer.channels.cache.get('717388534561898597');
    memberCounterChannel.setName('Members: ' + memberCount)
});


// Discord login
client.login(process.env.TOKEN);
