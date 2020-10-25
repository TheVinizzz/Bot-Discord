require('dotenv').config()
const Discord = require("discord.js");
const client = new Discord.Client();
const express = require("express")

const config = { prefix: process.env.PREFIX_TOKEN, token: process.env.BOT_TOKEN}

const app = express();

app.get("/", (req, res) => {
  const ping = new Date();
  ping.setHours(ping.getHours() - 3);
  console.log(`Ping recebido às ${ping.getUTCHours()}:${ping.getUTCMinutes()}:${ping.getUTCSeconds()}`);
  res.sendStatus(200);
});

client.on("ready", () => {
  console.log(`Bot foi iniciado, com ${client.users.size} usuários, em ${client.channels.size} canais, em ${client.guilds.size} servidores.`); 
});

client.on("message", async message => {

    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
    if(!message.content.startsWith(config.prefix)) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const comando = args.shift().toLowerCase();
  
  // coamdno ping
  if(comando === "ping") {
    const m = await message.channel.send("Ping?");
    m.edit(`Pong! A Latência é ${m.createdTimestamp - message.createdTimestamp}ms. A Latencia da API é ${Math.round(client.ping)}ms`);
  }

  else if(comando === "welcome") {
    const m = await message.channel.send("Welcome?");
    m.edit(`Bem vindo a Space, no que posso ajuda-lo?`);
  }

  else if(comando === "duvida") {
    const m = await message.channel.send("Duvida?");
    m.edit(`Ola, como posso ajuda-lo?`);
  }

  else if(comando === "dev") {
    const m = await message.channel.send("Dev?");
    m.edit(`Time DEV`);
  }

  else if(comando === "cnpj") {
    const m = await message.channel.send("CNPJ?");
    m.edit(`Eae ${message.author} Beleza? Nosso CNPJ é 33.037.448/0001-39`);
  }

  else if(comando === "piada") {
    const m = await message.channel.send("Piada?");
    m.edit(`Como se faz omelete de chocolate?
   
         - Com ovos de páscoa!.`);
  }

});
client.login(config.token);