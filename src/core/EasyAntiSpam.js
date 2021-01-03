const EasyAntiSpamOptions = {
    urls: false, // Delete or not all URLS
    discordInvites: false, // Delete or not Discord Invites 
    allowUrlImages: true, // Delete or not Images provided by URL
    dm: false, // If true, send your message with URL to private message
    messageLink: "Hey {author}, you are not allowed to send spam.", // Message sent when a user send an URL
    messageFlood: "Hey {author}, stop doing spam.", // Message sent when a user is warned for flood
    messageKicked: "{author} has been kicked.", // Message sent when a user is kicked
    messageBanned: "{author} has been banned.", // Message sent when a user is banned
    allowBots: true, // Allow bots
    allowedPerms: [], // List of permissions allowed to do spam
    warnRow: 4, // Messages sent in a row to be warned
    kickRow: 6, // Messages sent in a row to be kicked
    banRow: 8, // Messages sent in a row to be banned
    rowInterval: 2000, // Amount of time in ms to consider spam (2s)
    warnDuplicates: 5, // Duplicated messages sent to be warned
    kickDuplicates: 10, // Duplicated messages sent to be kicked
    banDuplicates: 15, // Duplicated messages sent to be banned
    duplicatesInterval: 600000, // Amount of time in ms to consider spam (10m)
    canKick: false, // If false, the bot dont kick users
    canBan: false, // If false, the bot dont ban users
    banDays: 1, // Amount of days of Ban
}

class EasyAntiSpam {
    constructor(options = {}) {
        for (const val in EasyAntiSpamOptions) {
            if (!options.hasOwnProperty(val) || typeof options[val] === "undefined" || options[val] === null) options[val] = EasyAntiSpamOptions[val];
        }
        this.options = options;
        this.data = {
            messages: [],
            warned: [],
            banned: [],
            kicked: []
        }
        setInterval(async () => {
            this.clearData();
        }, 900000); // 15 min
    }

    init() {
    }

    async run(message) {
        const { options, data } = this;
        if (!message.guild) return;
        if (message.author.bot && options.allowBots) return;
        if (options.allowedPerms.some(permission => message.member.hasPermission(permission))) return;

        /* Save every message */
        data.messages.push({
            author: message.author.id,
            content: message.content,
            date: Date.now()
        });

        let text = false;
        const URLexpression = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
        const DiscordExpression = /(discord\.(gg|io|me|li)\/.+|discordapp\.com\/invite\/.+)/i;
        const ImageExpression = /^(http|https):\/\/.*\.(png|jpg|jpeg|gif)$/i;

        if (options.urls && URLexpression.test(message.content)) text = true;
        if (options.discordInvites && DiscordExpression.test(message.content)) text = true;
        if (options.allowUrlImages && ImageExpression.test(message.content)) text = false;

        if (text) {
            message.delete();
            if (options.dm) {
                message.channel.send(options.messageLink.replace(/{author}/g, message.author.toString()) + ". I sent you the message via DM to correct it.");
                message.author.send("```" + message.content + "```")
            }
            else message.channel.send(options.messageLink.replace(/{author}/g, message.author.toString()));
        }


        const messagesInRow = data.messages.filter(m => m.date > Date.now() - options.rowInterval && m.author === message.author.id).length;
        const messagesDuplicated = data.messages.filter(m => m.date > Date.now() - options.duplicatesInterval && m.author === message.author.id && m.content === message.content).length;

        if (!data.warned.includes(message.author.id) && (messagesInRow === options.warnRow || messagesDuplicated === options.warnDuplicates)) {
            data.warned.push(message.author.id);

            this.clearKick(message);
            this.clearBan(message);
            await message.channel.send(options.messageFlood.replace(/{author}/g, message.author.toString()));
        }

        if (!data.kicked.includes(message.author.id) && (messagesInRow === options.kickRow || messagesDuplicated === options.kickDuplicates)) {
            if (!options.canKick) return;
            if (!message.member.kickable) return console.log(`EasyAntiSpam | ${message.author.tag} (ID: ${message.author.id}) could not be kicked, insufficient permissions.`);

            try {
                await message.member.kick("Spam");
                data.kicked.push(message.author.id);
                await message.channel.send(options.messageKicked.replace(/{author}/g, message.author.toString()));
            } catch (error) {
                return console.log(error);
            }
        }

        if (!data.banned.includes(message.author.id) && (messagesInRow === options.banRow || messagesDuplicated === options.banDuplicates)) {
            if (!options.canBan) return;
            if (!message.member.bannable) return console.log(`EasyAntiSpam | ${message.author.tag} (ID: ${message.author.id}) could not be banned, insufficient permissions.`);

            try {
                await message.member.ban({
                    reason: "Spam",
                    days: options.banDays
                });

                this.clearKick(message);
                this.clearWarn(message);
                this.clearMessages(message);

                await message.channel.send(options.messageBanned.replace(/{author}/g, message.author.toString()));
            } catch (error) {
                return console.log(error);
            }
        }
    }

    clearWarn(message) {
        const data = Object.create(this.data);
        let clear = data.warned.filter(function (item) {
            return item !== message.author.id;
        });
        this.data.warned = clear;
    }

    clearKick(message) {
        const data = Object.create(this.data);
        let clear = data.kicked.filter(function (item) {
            return item !== message.author.id;
        });
        this.data.kicked = clear;
    }

    clearBan(message) {
        const data = Object.create(this.data);
        let clear = data.banned.filter(function (item) {
            return item !== message.author.id;
        });
        this.data.banned = clear;
    }

    clearMessages(message) {
        const data = Object.create(this.data);
        let clear = data.messages.filter(function (item) {
            return item.author !== message.author.id;
        });
        this.data.messages = clear;
    }

    clearData() {
        const data = Object.create(this.data);
        this.data.messages = [];
        this.data.warned = [];
        return data;
    }
}

module.exports = EasyAntiSpam;