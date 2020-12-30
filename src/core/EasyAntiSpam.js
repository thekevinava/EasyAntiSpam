class EasyAntiSpam {
    constructor(options) {
        this.url = options.url;
        this.discord = options.discord;
        this.dm = options.dm;
        this.antiStaff = options.antiStaff;
    }

    async run(message) {
        if(!message.guild) return;
        let text = false;
        let URLexpression = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
        let Discordexpression = /(discord\.(gg|io|me|li)\/.+|discordapp\.com\/invite\/.+)/i;
        if (this.url) {
            if (URLexpression.test(message.content)) text = true;
        }

        if (this.discord) {
            if (Discordexpression.test(message.content)) text = true;
        }

        if (text) {
            message.delete();
            if (this.dm) {
                message.channel.send(`Hey <@${message.author.id}>, you are not allowed to send spam. I sent you the message via DM to correct it.`);
                message.author.send("```"+ message.content +"```")
            } else {
                message.channel.send(`Hey <@${message.author.id}>, you are not allowed to send spam.`);
            }
        }
    }



}

module.exports = EasyAntiSpam;