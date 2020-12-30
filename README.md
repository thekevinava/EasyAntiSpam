# Easy Anti Spam
<p>
    <a href="https://www.npmjs.com/package/easyantispam"><img alt="NPM Version" src="https://img.shields.io/npm/v/easyantispam"></a>
    <a href="https://github.com/thekevinava/EasyAntiSpam/issues"><img alt="GitHub issues" src="https://img.shields.io/github/issues/KevinavaDev/EasyAntiSpam"></a>
    <a href="https://www.npmjs.com/package/easyantispam"><img alt="NPM License" src="https://img.shields.io/npm/l/easyantispam"></a>
    <a href="https://www.npmjs.com/package/easyantispam"><img alt="NPM Downloads" src="https://img.shields.io/npm/dt/easyantispam"></a>
    <a href="https://discord.gg/gAFRJpasj5"><img alt="Discord" src="https://img.shields.io/discord/791333925968412703?color=%237289DA&label=Discord&logo=discord"></a>
</p>

[NPM](https://www.npmjs.com/package/easyantispam)

- [Installation](#installation)
- [Examples](#examples)
    - [Basic Use](#basic-use)
- [License](#license)

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
const AntiSpam = require('easyantispam');

client.once('ready', () => console.log('Bot is online!'));

client.on('message', async message => {
    AntiSpam(client, message);
});

client.login('TOKEN_HERE');
```

# License

MIT

