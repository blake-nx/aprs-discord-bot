const config = require("./config.json");
const Discord = require("discord.js");
const client = new Discord.Client();
const request = require("request");
const fs = require("fs");

let callsign;
let miniMapUrl;
let lat;
let lng;
let altitude;
let coords;
let timeUpdated = new Date();

let dateOptions = {
  weekday: "short",
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  timeZone: config.timezone
};

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
    callsign = args.join("").toLowerCase();
    request.get(
      `https://api.aprs.fi/api/get?name=${callsign}&what=loc&apikey=${
        config.aprs_token
      }&format=json`,
      function(error, res, body) {
        if (error) {
          console.log(error);
          return;
        }
        let data = JSON.parse(body);
        if (data.found === 0) {
          message.channel.send(
            "Sorry, I couldn't find that. Please check the call sign and try again."
          );
          return;
        } else {
          lat = data.entries[0].lat;
          lng = data.entries[0].lng;
          altitude = data.entries[0].altitude;
          coords = `${lat},${lng}`;
          timeUpdated = new Date(data.entries[0].time * 1000);
          miniMapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${coords}&zoom=13&size=600x300&maptype=roadmap&markers=color:blue|${coords}&key=${
            config.gmaps_token
          }`;
          let locationEmbed = new Discord.RichEmbed()
            .setColor(config.embed_color)
            .setAuthor("APRS Bot")
            .addField("Coordinates", coords)
            .addField(
              "Altitude",
              `${altitude}m (${Math.round(altitude * 3.28084)}ft)`
            )
            .addField("Time", timeUpdated.toLocaleString("en-US", dateOptions))
            .addField(
              "Directions",
              `https://www.google.com/maps/search/?api=1&query=${coords}`
            )
            .setImage(miniMapUrl)
            .setTimestamp()
            .setFooter("Data sourced from https://aprs.fi/");
          message.channel.send({ embed: locationEmbed });
          return;
        }
      }
    );
    return;
  }
});
client.login(config.token);
