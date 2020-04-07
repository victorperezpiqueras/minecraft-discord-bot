require('dotenv').config();

const { Client, MessageEmbed } = require('discord.js');
const ping = require('minecraft-server-util');
/* const mc = require('minecraft-protocol'); */
const ytdl = require('ytdl-core');
var gtts = require('gtts.js').gTTS;

const bot = new Client();

const PREFIX = '!';

function playAudio(msg, audioFile) {
  if (!msg.guild) return;
  if (msg.member.voice.channel) {
    msg.member.voice.channel.join()
      .then(connection => {
        connection.play('./audios/' + audioFile + '.mp3');
      })
  } else {
    msg.reply('Conéctate a algun chat de voz tontopolla');
  }
}

bot.on('ready', () => {
  console.log('Bot online');
  bot.user.setActivity("de chavaleo");
});

bot.on('message', msg => {
  if (msg.author.equals(bot.user)) return;
  if (!msg.content.startsWith(PREFIX)) {
    switch (msg.content.toLowerCase()) {
      case '5':
        msg.reply("por el culo te la hinco");
        break;
      case 'cinco':
        msg.reply("por el culo te la hinco");
        break;
      case 'marcelo':
        var embed = new MessageEmbed()
          .setImage('https://pbs.twimg.com/media/EQDl1utWoAAMFe6.jpg')
          .setTitle('agachate y conocelo')
        msg.channel.send(embed);
        break;
      case 'marselo':
        var embed = new MessageEmbed()
          .setImage('https://pbs.twimg.com/media/EQDl1utWoAAMFe6.jpg')
          .setTitle('agachate y conocelo')
        msg.channel.send(embed);
        break;
    }
  }

  let args = msg.content.substring(PREFIX.length).split(' ');
  switch (args[0].toLowerCase()) {
    case 'help':
      var embed = new MessageEmbed()
        .setTitle('Comandos')
        .addField('Server info: ', '!server')
        .addField('Chavalada online: ', '!online')
        .addField('Lista de audios: ', '!audiolist')
        .addField('El juego del tonto: ', '!tonto')
        .addField('El juego del tonto escrito a mano con espacios: ', '!tontoamano')
        .addField('El juego del tonto por voz: ', '!tontovoz')
        /*  .addField('Mayor o menor: ', '!mayormenor') */
        .setColor(0x00AE86)
      msg.channel.send(embed);
      break;
    case 'server':
      ping(process.env.MINECRAFT_SERVER_IP, process.env.MINECRAFT_SERVER_PORT, (error, response) => {
        if (error) throw error;
        console.log(response)
        var embed = new MessageEmbed()
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
      });
      break;

    case 'online':
      ping(process.env.MINECRAFT_SERVER_IP, parseInt(process.env.MINECRAFT_SERVER_PORT), (error, response) => {
        if (error) throw error;
        console.log(response)
        var embed = new MessageEmbed()
          .setTitle('Chavales Online: (' + response.onlinePlayers + ')')
          .setColor(0x00AE86)
        var jugadores = '';
        for (let x = 0; x < response.samplePlayers.length; x++) {
          jugadores += response.samplePlayers[x].name
          if (x + 1 < response.samplePlayers.length) jugadores += ", "
        }
        embed.setDescription(jugadores)
        msg.channel.send(embed);
      });
      break;

    case 'audiolist':
      var embed = new MessageEmbed()
        .setTitle('Comandos para audios de mierda')
        .addField('- !eminencia', '\u200B')
        .addField('- !lesbianas', '\u200B')
        .addField('- !muybien', '\u200B')
        .addField('- !quenecesitas', '\u200B')
        .addField('- !chupateesa', '\u200B')
        .addField('- !granjascerdos', '\u200B')
        .addField('- !sinduda', '\u200B')
        .addField('- !caballorapido', '\u200B')
        .addField('- !stalin', '\u200B')
        .addField('- !lanzare', '\u200B')
        .addField('- !pretorianos', '\u200B')
        .addField('- !valhala', '\u200B')
        .addField('- !valkirias', '\u200B')
        .addField('- !marcelo', '\u200B')
        .addField('- !homelochino', '\u200B')
        .addField('- !nomarge', '\u200B')
        .setColor(0x00AE86)
      msg.channel.send(embed);
      break;

    /* formato: sample.mp3 */
    case 'eminencia':
      playAudio(msg, 'eminencia');
      break;
    case 'lesbianas':
      playAudio(msg, 'lesbianas');
      break;
    case 'muybien':
      playAudio(msg, 'muybien');
      break;
    case 'quenecesitas':
      playAudio(msg, 'quenecesitas');
      break;
    case 'chupateesa':
      playAudio(msg, 'chupateesa');
      break;
    case 'granjascerdos':
      playAudio(msg, 'granjascerdos');
      break;
    case 'sinduda':
      playAudio(msg, 'sinduda');
      break;
    case 'caballorapido':
      playAudio(msg, 'caballorapido');
      break;
    case 'stalin':
      playAudio(msg, 'stalin');
      break;
    case 'lanzare':
      playAudio(msg, 'lanzare');
      break;
    case 'pretorianos':
      playAudio(msg, 'pretorianos');
      break;
    case 'valhala':
      playAudio(msg, 'valhala');
      break;
    case 'valkirias':
      playAudio(msg, 'valkirias');
      break;
    case 'marcelo':
      playAudio(msg, 'marcelo');
      break;
    case 'homelochino':
      playAudio(msg, 'homelochino');
      break;
    case 'nomarge':
      playAudio(msg, 'nomarge');
      break;
    /* case 'probando':
      console.log("hola")
      break; */

    case 'tonto':
      var members = msg.member.voice.channel.members;
      var random = Math.floor(Math.random() * members.size);
      var c = 0;
      members.forEach(member => {
        if (random == c) {
          msg.channel.send("El tonto es: <@" + member.user.id + ">");
        }
        c++;
      })
      break;

    case 'tontoamano':
      var members = msg.member.voice.channel.members;
      var random = Math.floor(Math.random() * (args.length - 1)) + 1;
      msg.channel.send("El tonto es: " + args[random] + "");
      break;

    case 'tontovoz':
      var members = msg.member.voice.channel.members;
      var random = Math.floor(Math.random() * (args.length - 1)) + 1;
      if (args[random]) {
        const gtts = require('gtts.js').gTTS;
        const speech = new gtts(args[random], 'it')
        speech.save("./audios/output.mp3")
          .then(function () {
            msg.member.voice.channel.join()
              .then(connection => {
                connection.play('./audios/output.mp3');
              })
          }).catch(function (err) {

          })
      }
      break;

    case 'italiano':
      var frase = "";
      for (var i = 1; i < args.length; i++)frase += " " + args[i];
      var speech = new gtts(frase, 'it')
      speech.save("./audios/output.mp3")
        .then(function () {
          msg.member.voice.channel.join()
            .then(connection => {
              connection.play('./audios/output.mp3');
            })
        }).catch(function (err) { })
      break;
    case 'chino':
      var frase = "";
      for (var i = 1; i < args.length; i++)frase += " " + args[i];
      var speech = new gtts(frase, 'zh-cn')
      speech.save("./audios/output.mp3")
        .then(function () {
          msg.member.voice.channel.join()
            .then(connection => {
              connection.play('./audios/output.mp3');
            })
        }).catch(function (err) { })
      break;

    case 'portugues':
      var frase = "";
      for (var i = 1; i < args.length; i++)frase += " " + args[i];
      var speech = new gtts(frase, 'pt')
      speech.save("./audios/output.mp3")
        .then(function () {
          msg.member.voice.channel.join()
            .then(connection => {
              connection.play('./audios/output.mp3');
            })
        }).catch(function (err) { })
      break;

    /* case 'mayormenor':
      // inicializar 
      var cartas = "1 1 1 1 2 2 2 2 3 3 3 3 4 4 4 4 5 5 5 5 6 6 6 6 7 7 7 7 10 10 10 10 11 11 11 11 12 12 12 12";
      cartas = cartas.split(' ');
      console.log(cartas)
      var random = Math.floor(Math.random() * (cartas.length - 1)) + 1;
      var cartaRandom = Number(cartas[random]);
      var cartaVieja = Number(cartas[random]);
      var tragos = 0;
      // mostrar carta 
      msg.channel.send("Ha salido: " + cartaRandom);
      //mostar cartas totales 
      cartas.splice(random, 1);
      msg.channel.send("Cartas totales: " + cartas);


      msg.channel.send("¿Mayor o menor?");
      var respuesta = "";
      // bot.on('message', msg => { 
      bot.on('message', msg => {
        if (msg.content === "fin") break;
        if (cartas.length == 0) return;

        respuesta = msg.content.toLowerCase();

        // carta aleatoria 
        var random = Math.floor(Math.random() * (cartas.length - 1)) + 1;
        cartaVieja = Number(cartaRandom);
        cartaRandom = Number(cartas[random]);
        console.log("random=", cartaRandom)
        console.log("vieja=", cartaVieja)
        // mostrar carta
        msg.channel.send("Ha salido: " + cartaRandom);

        console.log(Number(cartaRandom))
        console.log(Number(cartaVieja))
        cartas.splice(random, 1);
        if (respuesta === "mayor") {
          if (Number(cartaRandom) > Number(cartaVieja)) {
            msg.channel.send("Te salvaste pinche");
            tragos++;
          } else {
            msg.channel.send("A beber " + tragos + " tragos");
            tragos = 0;
          }
        }
        else if (respuesta === "menor") {
          if (Number(cartaRandom) < Number(cartaVieja)) {
            msg.channel.send("Te salvaste pinche");
            tragos++;
          } else {
            msg.channel.send("A beber " + tragos + " tragos");
            tragos = 0;
          }
        }
        // mostar cartas totales 
        msg.channel.send("Cartas totales: " + cartas);
        msg.channel.send("¿Mayor o menor?");
      });
      break; */
  }

});
/*
newUserChannel.join().then(connection => {
      connection.play('./audios/ts3entered.mp3');
     }) 
 */

/* bot.on('voiceStateUpdate', (oldMember, newMember) => {
  let newUserChannel = newMember.voiceChannel
  let oldUserChannel = oldMember.voiceChannel

  if (newUserChannel !== undefined) {
    console.log("play")
    newMember.voice.channel.join().then(connection => {
      console.log("play")
      connection.play('./audios/ts3entered.mp3');
    })
  }

  if (oldUserChannel === undefined && newUserChannel !== undefined) {

    // User Joins a voice channel
    console.log("joined")

  } 
}) */

bot.login(process.env.DISCORD_TOKEN);
