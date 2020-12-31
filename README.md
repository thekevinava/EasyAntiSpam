# Easy Anti Spam
<p>
    <a href="https://www.npmjs.com/package/easyantispam"><img alt="NPM Version" src="https://img.shields.io/npm/v/easyantispam"></a>
    <a href="https://github.com/thekevinava/EasyAntiSpam/issues"><img alt="GitHub issues" src="https://img.shields.io/github/issues/thekevinava/EasyAntiSpam"></a>
    <a href="https://www.npmjs.com/package/easyantispam"><img alt="NPM License" src="https://img.shields.io/npm/l/easyantispam"></a>
    <a href="https://www.npmjs.com/package/easyantispam"><img alt="NPM Downloads" src="https://img.shields.io/npm/dt/easyantispam"></a>
    <a href="https://discord.gg/gAFRJpasj5"><img alt="Discord" src="https://img.shields.io/discord/791333925968412703?color=%237289DA&label=Discord&logo=discord"></a>
    <a href="https://www.npmjs.com/package/easyantispam">NPM</a>
</p>

The principal function for this package is handle all URLs sended by users on a server and delete it if you want.

- [Support](#support)
- [Installation](#installation)
- [Examples](#examples)
    - [Basic Use](#basic-use)
- [API](#api)
- [Options](#options)
- [License](#license)

# Support

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

Easy = new EasyAntiSpam.Config({ type: 2, antiStaff: false, warningMessage: `Message to advice` }); // Config variables

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

Properties marked with `?` are optional.

### EasyAntiSpamOptions

```js
{
    type: 1 // 1: Only Discord Invites, 2: All URLS
    dm?: true/false, // If you want to send a DM with his/her message. False by default.
    antiStaff?: true/false, // If you want to delete staff urls or not. False by default.
    warningMessage?: "Here is your warning message" // You have different options found in warningMessageOptions section.
}
```

### warningMessageOptions

- `{author}` - Returns a mentioned author of the message.


# License

MIT

