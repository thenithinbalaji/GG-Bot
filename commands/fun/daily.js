const mongo = require('../../database/mongo');
const userSchema = require('../../database/schemas/userSchema');
const { MessageEmbed } = require('discord.js');

module.exports = {
    commands: ['daily'],
    description: 'get some fantastic daily rewards, coins, xp and what not?',
    expectedArgs: "<user's @>",

    callback: async (message, arguments, text) => {
        const { guild, member } = message;
        const { id } = member;

        const obj = {
            userid: id,
        };

        await mongo().then(async (mongoose) => {
            try {
                const results = await userSchema.findOne(obj);
                if (results) {
                    const then = new Date(results.dailyclaimtimestamp).getTime();
                    const now = new Date().getTime();

                    const diffTime = Math.abs(now - then);
                    const diffDays = diffTime / (1000 * 60 * 60 * 24);

                    if (diffDays <= 1) {
                        const claimed_embed = new MessageEmbed()
                        .setTitle(`Daily Rewards`)
                        .setDescription(`You have already claimed your **daily** rewards! You can claim again in ${24 - (Math.round(diffDays * 24))}hrs`)
                        .setColor('#ff7b00')
                        .setImage('https://cdn.dribbble.com/users/1498470/screenshots/4498386/hourglass.gif')
                        message.reply({ embeds: [claimed_embed] });
                        return;
                    }
                }
				var upd = {
					userid : id,
					dailyclaimtimestamp : new Date().getTime(),
				} 
                await userSchema.findOneAndUpdate(obj, upd, { new: true, upsert: true });
                message.reply(`You got your daily`);

            } 
            finally {
            }
        });
    },
    permissions: [],
    requiredRoles: [],
};
