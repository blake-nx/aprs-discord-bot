const request = require("request");
const config = require("../config.json");
const Discord = require("discord.js");

let dateOptions = {
  weekday: "short",
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  timeZone: config.timezone
};

function titleCase(title) {
  if (title.length > 0) {
    return title.charAt(0).toUpperCase() + title.slice(1);
  }
  return;
}

function getWeather(callsign, message) {
  request.get(
    `https://api.aprs.fi/api/get?name=${callsign}&what=wx&apikey=${
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
        let temp = data.entries[0].temp
          ? `${data.entries[0].temp}C`
          : "Not available";
        let pressure = data.entries[0].pressure || "Not available";
        let humidity = data.entries[0].humidity || "Not available";
        let wind_direction = data.entries[0].wind_direction || "Not available";
        let wind_speed = data.entries[0].wind_speed || "Not available";
        let wind_gust = data.entries[0].wind_gust || "Not available";
        let rain_1h = data.entries[0].rain_1h
          ? `${data.entries[0].rain_1h}mm`
          : "Not available";
        let rain_24h = data.entries[0].rain_24h
          ? `${data.entries[0].rain_24h}mm`
          : "Not available";
        let rain_mn = data.entries[0].rain_mn
          ? `${data.entries[0].rain_mn}mm`
          : "Not available";
        let luminosity = data.entries[0].luminosity || "Not available";
        timeUpdated = new Date(data.entries[0].time * 1000);
        let miniMapUrl = `http://www.findu.com/cgi-bin/radar-find.cgi?call=${callsign}`;
        let locationEmbed = new Discord.RichEmbed()
          .setColor(config.embed_color)
          .setAuthor("APRS Bot")
          .addField("Temp", temp)
          .addField("Pressure", pressure)
          .addField("Humidity", humidity)
          .addField("Wind direction", wind_direction)
          .addField("Wind speed", wind_speed)
          .addField("Wind gust", wind_gust)
          .addField("Rainfall past 1hr", rain_1h)
          .addField("Rainfall past 24hrs", rain_1h)
          .addField("Rainfall since midnight", rain_mn)
          .addField("Luminosity", luminosity)
          .addField("Time", timeUpdated.toLocaleString("en-US", dateOptions))
          .setImage(miniMapUrl)
          .setTimestamp()
          .setFooter("Data sourced from https://aprs.fi/");
        message.channel.send({ embed: locationEmbed });
        return;
      }
    }
  );
}

module.exports = getWeather;
