# Easy Anti Spam
<p>
    <a href="https://www.npmjs.com/package/easyantispam"><img alt="NPM Version" src="https://img.shields.io/npm/v/easyantispam"></a>
    <a href="https://github.com/thekevinava/EasyAntiSpam/issues"><img alt="GitHub issues" src="https://img.shields.io/github/issues/thekevinava/EasyAntiSpam"></a>
    <a href="https://www.npmjs.com/package/easyantispam"><img alt="NPM License" src="https://img.shields.io/npm/l/easyantispam"></a>
    <a href="https://www.npmjs.com/package/easyantispam"><img alt="NPM Downloads" src="https://img.shields.io/npm/dt/easyantispam"></a>
    <a href="https://discord.gg/gAFRJpasj5"><img alt="Discord" src="https://img.shields.io/discord/791333925968412703?color=%237289DA&label=Discord&logo=discord"></a>
    <a href="https://easyantispam.kevinava.com"><img alt="GitBook" src="https://img.shields.io/badge/Click-GitBook-green"></a>
    <a href="https://www.npmjs.com/package/easyantispam">NPM</a>
</p>

This package have 2 principal functions:
- Handle URLs spammed.
- Handle flood messages and repeated messages.


# Summary

- [Support](#support)
- [Installation](#installation)
- [Examples](#examples)
    - [Basic Use](#basic-use)
- [API](#api)
- [Options](#options)
- [License](#license)

# Support

[GitBook Page](https://easyantispam.kevinava.com)
You can contact us on your [Discord server](https://discord.gg/gAFRJpasj5)

# Installation
Using NPM:
```js
npm install easyantispam
```
Using Yarn (Linux):
```js
yarn add easyantispam
```

# Examples

## Basic use
```js
const Discord = require('discord.js');
const client = new Discord.Client();
const EasyAntiSpam = require('easyantispam'); // Js
// TypeScript: import EasyAntiSpam from "easyantispam";

Easy = new EasyAntiSpam.Config({ urls: true, canKick: true, canBan: true, warnRow: 3 }); // And more config variables...

client.once('ready', () => console.log('Bot is online!'));

client.on('message', async message => {
    Easy.run(message);
});

client.login('TOKEN_HERE');
```

# API

The Config is to initialize the Anti Spam system.
The run() is placed inside the message event to analyze all received messages.

### Config(options: EasyAntiSpamOptions) returns Promise<boolean>

- `EasyAntiSpamOptions` - List of options can be found [here](#options).

### run(message)

- `message` - The message to be analyzed.

# Options

Properties marked with `?` are optional. All options are predefined

### EasyAntiSpamOptions

```js
{
    urls?: false, // Delete or not all URLS
    discordInvites?: false, // Delete or not Discord Invites 
    allowUrlImages?: true, // Delete or not Images provided by URL
    dm?: false, // If true, send your message with URL to private message
    messageLink?: "Hey {author}, you are not allowed to send spam.", // Message sent when a user send an URL
    messageFlood?: "Hey {author}, stop doing spam.", // Message sent when a user is warned for flood
    messageKicked?: "{author} has been kicked.", // Message sent when a user is kicked
    messageBanned?: "{author} has been banned.", // Message sent when a user is banned
    allowBots?: true, // Allow bots
    allowedPerms?: [], // List of permissions allowed to do spam
    warnRow?: 4, // Messages sent in a row to be warned
    kickRow?: 6, // Messages sent in a row to be kicked
    banRow?: 8, // Messages sent in a row to be banned
    rowInterval?: 2000, // Amount of time in ms to consider spam (2s)
    warnDuplicates?: 5, // Duplicated messages sent to be warned
    kickDuplicates?: 10, // Duplicated messages sent to be kicked
    banDuplicates?: 15, // Duplicated messages sent to be banned
    duplicatesInterval?: 600000, // Amount of time in ms to consider spam (10m)
    canKick?: false, // If false, the bot dont kick users
    canBan?: false, // If false, the bot dont ban users
    banDays?: 1, // Amount of days of Ban
}
```

### warningMessageOptions

- `{author}` - Returns a mentioned author of the message.


# License

MIT

