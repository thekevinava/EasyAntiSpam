# Easy Anti Spam
<p>
    <img alt="NPM Version" src="https://img.shields.io/npm/v/easyantispam">
    <img alt="GitHub issues" src="https://img.shields.io/github/issues/KevinavaDev/EasyAntiSpam">
    <img alt="NPM License" src="https://img.shields.io/npm/l/easyantispam">
    <img alt="NPM Downloads" src="https://img.shields.io/npm/dt/easyantispam">
</p>

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

