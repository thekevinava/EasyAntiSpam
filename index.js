module.exports = (client, message) => {
    const discord = require("discord.js");
    
    let text = false;

    if (/(discord\.(gg|io|me|li)\/.+|discordapp\.com\/invite\/.+)/i.test(message.content)) text = true;
    
    if (text) {
        message.delete();
        message.channel.send(`Hey <@${message.author.id}>, you are not allowed to send spam. I sent you the message via DM to correct it.`);
        message.author.send("```"+ message.content +"```")
    }
}