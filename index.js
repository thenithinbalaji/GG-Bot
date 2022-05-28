const { token } = require('./config.json');
const { Client, Intents } = require('discord.js');
const { MessageEmbed } = require('discord.js');
const { Routes } = require('discord-api-types/v9');
const { Collection } = require('discord.js');
const {dm_prefix} = require('./config.json');

const client = new Client({ 
  intents:  [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES ],
  partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});


client.on("messageCreate", msg => {
  
  if(msg.author.bot)
    return

  else
  {
    
    if(msg.channel.type == "DM"){

      if (msg.content == dm_prefix + " " + "help") {
        const helpEmbed = new MessageEmbed()
        .setTitle('DM help')
        .addField('🖥️ Server Suggestions', `${dm_prefix} suggest <message>`, false)
        .setFooter('Want to suggest something? DM this bot');
        msg.channel.send({ embeds: [helpEmbed] });
      }
  
      else if(msg.content.startsWith(`${dm_prefix} suggest`)){
        info = msg.content.slice((`${dm_prefix} suggest`).length)
  
        if (info.length > 5){
        const suggestEmbed = new MessageEmbed()
        .setTitle('Suggestion')
        .setDescription(info)

        msg.client.channels.cache.get("980040052816113665").send({ embeds: [suggestEmbed] }) 
        // get channel id this from db!!!
        msg.react('✅');

        }
      }
  
      else {
        msg.author.send(`The DM prefix is -> \`${dm_prefix}\` \nTry typing \`${dm_prefix} help\` `)
      }

    }

    else 
    {
      let { member, content, guild } = msg;

      if (content === "rub daily") 
      {
        const daily = require('./commands/fun/daily')
        let {
            commands,
            expectedArgs = '',
            permissionError = 'You do not have permission to run this command.',
            minArgs = 0,
            maxArgs = null,
            cooldown = -1,
            repeats = 1,
            permissions = [],
            requiredRoles = [],
            callback,
          } = daily;

          const arguments = content.split(/[ ]+/);
          callback(msg, arguments, arguments.join(' '))
      }
    }
  }
})

client.login(token);