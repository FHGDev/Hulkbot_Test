const discord = require('discord.js')
const bot = new discord.Client()
const fs = require('fs')

bot.commands = new discord.Collection()
bot.invite = ""
bot.support = ""
bot.website = "https://bot.hulkbot.ml/testing-hulkbot"

fs.readdir('./commands/', (err, files) => {
  if (err) return console.error("Error loading commands.");
  files.filter(f => f.split(".").pop() == "js").forEach((f, i) => {
    bot.commands.set(require(`./commands/${f}`).help.name, require(`./commands/${f}`)
  })
})
