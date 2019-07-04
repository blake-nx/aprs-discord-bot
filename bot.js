const config = require("./config.json");
const Discord = require("discord.js");
const client = new Discord.Client();
const getLocationInfo = require("./modules/getLocationInfo");
const getWeather = require("./modules/getWeather");

client.on("error", e => {
  console.error(e);
  return;
});

client.on("ready", () => {
  client
    .generateInvite([
      "SEND_MESSAGES",
      "READ_MESSAGES",
      "EMBED_LINKS",
      "ATTACH_FILES"
    ])
    .then(link => {
      console.log(link);
    });
  console.log(
    `APRS Bot firing up with ${client.users.size} users, in ${
      client.channels.size
    } channels of ${client.guilds.size} guilds.`
  );
  return client.user.setActivity("Stations", { type: "Watching" });
});

client.on("message", message => {
  if (message.author.bot) return;
  if (message.content.indexOf(config.prefix) !== 0) return;
  const args = message.content
    .slice(config.prefix.length)
    .trim()
    .split(/ +/g);
  const command = args.shift();
  if (command === "call") {
    let callsign = args.join("").toLowerCase();
    getLocationInfo(callsign, message);
    return;
  }
  if (command === "weather" || command === "wx") {
    let callsign = args.join("").toLowerCase();
    getWeather(callsign, message);
    return;
  }
});
client.login(config.token);
