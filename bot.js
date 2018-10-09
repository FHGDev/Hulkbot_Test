const discord = require('discord.js')
const bot = new discord.Client()
const fs = require('fs')
const pak = require('./package.json')
const prefix = "h;"

bot.commands = new discord.Collection()
bot.invite = ""
bot.support = ""
bot.website = "https://bot.hulkbot.ml/testing-hulkbot"

fs.readdir('./commands/', (err, files) => {
  if (!err) return console.log("Loading commands...");
  if (err) return console.error("Error loading commands.");
  files.filter(f => f.split(".").pop() == "js").forEach((f, i) => {
    bot.commands.set(require(`./commands/${f}`).help.name, require(`./commands/${f}`))
  })
})

bot.on("ready", () => {
  console.log(`${bot.user.username} v${pak.version} loaded!`)
})

bot.on("message", message => {
  if (!message.content.startsWith(prefix)) return;
  if (!message.guild) return;
  if (message.author.bot) return;
  
  const mArray = message.content.split(" ");
  const args = mArray.slice(1)
  const logcmd = mArray[0].slice(prefix.length)
  const cmd = bot.commands.get(logcmd)
})

bot.login(process.env.token)

