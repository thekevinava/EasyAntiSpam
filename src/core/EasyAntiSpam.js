class EasyAntiSpam {
    constructor(options) {
        if (typeof options !== "object")
            throw "options must be of type object. Received: " + typeof options;

        if (!options.type) {
            console.log("EasyAntiSpam | No Type Option configured");
            process.exit(1);
        }

        if (options.type && typeof options.type !== "number") {
            console.log(" EasyAntiSpam | Type option received but wasn't of type number. received: " + typeof options.type);
            process.exit(1);
        }

        if (options.type > 2 || options.type < 1) {
            console.log(" EasyAntiSpam | Type option received but wasn't of correct value. The correct values are:\n\t1. Discord Invites\n\t2. All URLS");
            process.exit(1);
        }

        this.type = options.type;
        this.dm = options.dm;
        this.antiStaff = options.antiStaff;
        this.warningMessage = options.warningMessage;
    }
    
    async run(message) {
        let warn = this.warningMessage.replace(/{author}/g, `<@${message.author.id}>`);
        if (!message.guild) return;
        let text = false;

        let URLexpression = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
        let DiscordExpression = /(discord\.(gg|io|me|li)\/.+|discordapp\.com\/invite\/.+)/i;
        
        
        if (this.type == 1) if (DiscordExpression.test(message.content)) text = true;
        if (this.type == 2) if (URLexpression.test(message.content)) text = true;

        if (text) {
            if (!this.antiStaff && (message.member.hasPermission("ADMINISTRATOR") || message.member.hasPermission("MANAGE_CHANNELS"))) return;

            message.delete();

            if (this.dm) {
                if (this.warningMessage) message.channel.send(warn + `. I sent you the message via DM to correct it.`);
                else message.channel.send(`Hey <@${message.author.id}>, you are not allowed to send spam. I sent you the message via DM to correct it.`);
                message.author.send("```" + message.content + "```")
            } else {
                if (this.warningMessage) message.channel.send(warn);
                else message.channel.send(`Hey <@${message.author.id}>, you are not allowed to send spam.`);
            }
        }
    }
}

module.exports = EasyAntiSpam;