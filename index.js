require('dotenv').config();

const { Client, MessageEmbed } = require('discord.js');
const ping = require('minecraft-server-util');
const mc = require('minecraft-protocol');

const bot = new Client();

const PREFIX = '!';

/* const mcBot = mc.createClient({
  host: "51.83.233.138",   // optional
  port: 25616,         // optional
  username: "MCBot",
  version: "1.15.2"
});
mcBot.on('chat', function (packet) {
  // Listen for chat messages and echo them back.
  var jsonMsg = JSON.parse(packet.message);
  if (jsonMsg.translate == 'chat.type.announcement' || jsonMsg.translate == 'chat.type.text') {
    var username = jsonMsg.with[0].text;
    var msg = jsonMsg.with[1];
    if (username === client.username) return;
    client.write('chat', { message: msg });
  }
}); */

bot.on('ready', () => {
  console.log('Bot online');
});

bot.on('message', msg => {
  if (msg.author.equals(bot.user)) return;
  if (!msg.content.startsWith(PREFIX)) return;

  let args = msg.content.substring(PREFIX.length).split(' ');
  switch (args[0].toLowerCase()) {
    case 'help':
      const embed = new MessageEmbed()
        .setTitle('Comandos')
        .addField('Server info: ', '!server')
        .addField('Chavalada online: ', '!online')
        .setColor(0x00AE86)
      msg.channel.send(embed);
      break;
    case 'server':
      ping('51.83.233.138', 25616, (error, response) => {
        if (error) throw error;
        console.log(response)
        const embed = new MessageEmbed()
          .setTitle('Server Info')
          .addField('Host: ', response.host)
          .addField('Puerto: ', response.port)
          .addField('Versión: ', response.version)
          .addField('Max Players: ', response.maxPlayers)
          .setColor(0x00AE86)
        var jugadores = '';
        for (let x = 0; x < response.samplePlayers.length; x++) {
          jugadores += response.samplePlayers[x].name
          if (x + 1 < response.samplePlayers.length) jugadores += ", "
        }
        embed.addField('Chavales jugando: (' + response.onlinePlayers + ')', jugadores)

        msg.channel.send(embed);

        /* console.log(response) */
      });
      break;

    case 'online':
      ping('51.83.233.138', 25616, (error, response) => {

        if (error) throw error;
        console.log(response)
        const embed = new MessageEmbed()
          .setTitle('Chavales Online: (' + response.onlinePlayers + ')')
          .setColor(0x00AE86)
        var jugadores = '';
        for (let x = 0; x < response.samplePlayers.length; x++) {
          jugadores += response.samplePlayers[x].name
          if (x + 1 < response.samplePlayers.length) jugadores += ", "
        }
        embed.setDescription(jugadores)

        msg.channel.send(embed);

        /* console.log(response) */
      });
      break;

    case '5':
      msg.author.send("Por el culo te la hinco");
      break;
  }

});

/* const mcBot = mc.createClient({
  host: "51.83.233.138",   // optional
  port: 25616,         // optional
  username: "MCBot",
});
mcBot.on('chat', function (packet) {
  // Listen for chat messages and echo them back.
  var jsonMsg = JSON.parse(packet.message);
  if (jsonMsg.translate == 'chat.type.announcement' || jsonMsg.translate == 'chat.type.text') {
    var username = jsonMsg.with[0].text;
    var msg = jsonMsg.with[1];
    if (username === client.username) return;
    client.write('chat', { message: msg });
  }
}); */

bot.login(process.env.DISCORD_TOKEN);
