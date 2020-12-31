/**
 * Options for EasyAntiSpam with URLS
 * 
 * @typedef {object} EasyAntiSpamOptions Options setted for EasyAntiSpam
 * 
 * @property {boolean} [urls=false] Delete or not all URLS
 * @property {boolean} [discordInvites=false] Delete or not Discord Invites 
 * @property {boolean} [allowUrlImages=true] Delete or not Images provided by URL
 * @property {boolean} [dm=false] If true, send your message with URL to private message
 * @property {string} [messageLink="Hey {author}, you are not allowed to send spam."] Message sent when a user send an URL
 * @property {string} [messageFlood="Hey {author}, stop doing spam."] Message sent when a user send an URL
 * @property {string} [messageKicked="{author} has been kicked."] Message sent when a user send an URL
 * @property {string} [messageBanned="{author} has been banned."] Message sent when a user send an URL
 * @property {boolean} [allowBots=true] Allow bots
 * @property {Array<string>} [allowedPerms=[]] List of permissions allowed to do spam
 * @property {number} [warnRow=4] Messages sent in a row to be warned
 * @property {number} [kickRow=6] Messages sent in a row to be kicked
 * @property {number} [banRow=8] Messages sent in a row to be banned
 * @property {number} [rowInterval=2000] Amount of time in ms to consider spam
 * @property {number} [warnDuplicates=5] Amount of duplicated messages to be warned
 * @property {number} [kickDuplicates=10] Amount of duplicated messages to be kicked
 * @property {number} [banDuplicates=15] Amount of duplicated messages to be banned
 * @property {number} [duplicatesInterval] Amount of time in ms to consider spam
 * @property {boolean} [canKick=false] If false, the bot dont kick users
 * @property {boolean} [canBan=false] If false, the bot dont ban users
 */

const EasyAntiSpamOptions = {
    urls: false,
    discordInvites: false,
    allowUrlImages: true,
    dm: false,
    messageLink: "Hey {author}, you are not allowed to send spam.",
    messageFlood: "Hey {author}, stop doing spam.",
    messageKicked: "{author} has been kicked.",
    messageBanned: "{author} has been banned.",
    allowBots: true,
    allowedPerms: [],
    warnRow: 4,
    kickRow: 6,
    banRow: 8,
    rowInterval: 2000, // 2s
    warnDuplicates: 5,
    kickDuplicates: 10,
    banDuplicates: 15,
    duplicatesInterval: 600000, // 10 min
    canKick: false,
    canBan: false,
    banDays: 1,
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

        // let URLexpression = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
        // let DiscordExpression = /(discord\.(gg|io|me|li)\/.+|discordapp\.com\/invite\/.+)/i;
        // if (/^(http|https):\/\/.*\.(png|jpg|jpeg|gif)$/i.test(message.content)) text = false;
        // if (options.dm) {
        //     await message.channel.send(options.message + ". I sent you the message via DM to correct it.");
        //     await message.author.send("```" + message.content + "```");
        // }
        // else await message.channel.send(options.message);


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