const { Client, Intents } = require('discord.js');
const { MessageEmbed } = require('discord.js');
const { Routes } = require('discord-api-types/v9');
const { Collection } = require('discord.js');


const client = new Client({ 
  intents:  [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES ],
  partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
});

const { token } = require('./config.json');
const { dm_prefix } = require('./config.json');
const {channel_id} = require('./config.json');

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
})


client.on("messageCreate", msg => {
  
  if(msg.author.bot)
  return

  else {

    if(msg.channel.type != "DM"){
    
      if (msg.content === dm_prefix + " " + "ping") {
        msg.reply("pong");
      }

      else if(msg.content == dm_prefix + " " + "help"){
        const exampleEmbed = new MessageEmbed()
        .setTitle('Cool Embed 😎')
        .setDescription('Embeds are cool')
        .addField('Inline field title', 'Some value here', true)
        .addField('Inline field title', 'Some value here', true)

        msg.channel.send({ embeds: [exampleEmbed] });
      }
  
    }

    else {

    if (msg.content == dm_prefix + " " + "help") {
      const exampleEmbed = new MessageEmbed()
      .setTitle('DM help')
      .addField('🖥️ Server Suggestions', `${dm_prefix} suggest <message>`, false)
      .addField('🤖 Bot Suggestions', `${dm_prefix} improve <message>`, false)
      .addField('❔ Anonymous Question', `${dm_prefix} ask <message>`, false)
      
      msg.channel.send({ embeds: [exampleEmbed] });
    }

    else if(msg.content.startsWith(`${dm_prefix} suggest`)){
      info = msg.content.replace(`${dm_prefix} suggest`, "")

      if (info.length > 5){
      const suggestEmbed = new MessageEmbed()
      .setTitle('Suggestion #' + String(Math.floor(Math.random() * 1000)))
      .setDescription(info)
      .setFooter('1. The number will be incremented using values from db, \n2. reaction will be added by the bot')

      msg.client.channels.cache.get(channel_id).send({ embeds: [suggestEmbed] })
      }
    }

    else {
      msg.author.send(`The DM prefix is -> \`${dm_prefix}\` \nTry typing \`${dm_prefix} help\` `)
    }

    }
  
  }


})

client.login(token);