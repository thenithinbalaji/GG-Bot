require('dotenv').config()
require('module-alias/register');
const { token } = require('./config.json');
const { MessageEmbed } = require('discord.js');
const {dm_prefix} = require('./config.json');
const Commando = require('discord.js-commando');
const path  = require('path');

const ownerId = process.env.owner_ID
const client = new Commando.Client({
    owner: ownerId,
    commandPrefix: process.env.GLOBAL_PREFIX
})
client.registry
    .registerGroups([
        ['fun', 'Fun commands'],
        ['management', 'Server Management Commands'],
        ['misc', 'Misc Commands'],
        ['moderation', 'Moderation Commands']
    ]).registerDefaults()
    .registerCommandsIn(path.join(__dirname, 'commands'));

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity('"!help" - for help');
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
  }
})

client.login(token);