const getytid = require('get-youtube-id')
const ytinfo = require('youtube-info')
const key = process.env.ytapikey
const get = require('request')
const dl = require('ytdl-core')

var queue = []
var isPlaying = false
var controller = "499015008450117663"


module.exports.run = (bot, message, args) => {
  const m = message.member
  const vc = m.voiceChannel
  const msg = args.join(" ");
  if (!vc) return message.channel.send("Join a voice channel first.");
  
  if (queue.length > 0 || isPlaying) {
    getID(msg, (id) => {
      addqueue(id)
      ytinfo(id, (err, info) => {
        if (err) throw new Error(err);
        const embed = new discord.RichEmbed()
        .addField("Now Playing", `Started playing **${info.title}** in ${vc.name}.`)
        .setTimestamp()
        .setColor("GREEN")
        message.channel.send({embed: embed})
      })
    })
  } else {
    isPlaying = true
    getID(msg, (id) => {
      queue.push("placeholder")
      play(id, mess)
      ytinfo(id, (err, info) => {
        const embed = new discord.RichEmbed()
        .addField("Now Playing", `Started playing **${info.title}** in **${vc.name}**.`)
        .setTimestamp()
        .setColor("GREEN")
      })
    })
  }
}

function play(id, message) {
  voicechannel = message.member.voiceChannel;
  
  voicechannel.join().then(conn => {
    stream = ytdl(`https://youtube.com/watch?v=${id}`, {
      filter: "audioonly"
    })
    
    skipreq = 0;
    skippers = [];
    
    dispatcher = conn.playStream(stream)
    
  })
}

function getID(str, cb) {
  if (isYt(str)) {
    cb(getytid(str))
  } else {
    searchyt(str, (id) => {
      cb(id)
    })
  }
}

function addqueue(strID) {
  if (isYt(strID)) {
    queue.push(getytid(strID))
  } else {
    
  }
}

function searchyt(q, cb) {
  get(`https://googleapis.com/youtube/v3/search?part=id&type=video&q=${encodeURIComponent(q)}&key=${key}`, (err, res, body) => {
    var json = JSON.parse(body)
    if (json.items) {
      cb(json.items[0].id.videoId);
    }
  })
}

function isYt(str) {
  return str.toLowerCase().indexOf("youtube.com") > -1;
}

module.exports.help = {
  name: "play"
}
