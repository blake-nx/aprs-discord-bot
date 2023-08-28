import got from 'got';
import { EmbedBuilder } from 'discord.js';
import { loadJSON } from '../utils/loadJSON.js';
import { DATE_OPTIONS, UNAVAILABLE } from '../utils/enums.js';

const config = await loadJSON('../../config.json');

export async function getWeather(callsign, message) {
  if (!callsign) {
    return message.channel.send("Hmm, Looks like you didn't provide a callsign. Try again!");
  }

  try {
    const data = await got
      .get(
        `https://api.aprs.fi/api/get?name=${callsign}&what=wx&apikey=${config.aprs_token}&format=json`
      )
      .json();

    if (!data.found) {
      return message.channel.send(
        "Sorry, I couldn't find that. Please check the callsign and try again."
      );
    } else {
      let temp = data.entries[0].temp ? `${data.entries[0].temp}C` : UNAVAILABLE;
      let pressure = data.entries[0].pressure || UNAVAILABLE;
      let humidity = data.entries[0].humidity || UNAVAILABLE;
      let wind_direction = data.entries[0].wind_direction || UNAVAILABLE;
      let wind_speed = data.entries[0].wind_speed || UNAVAILABLE;
      let wind_gust = data.entries[0].wind_gust || UNAVAILABLE;
      let rain_1h = data.entries[0].rain_1h ? `${data.entries[0].rain_1h}mm` : UNAVAILABLE;
      let rain_24h = data.entries[0].rain_24h ? `${data.entries[0].rain_24h}mm` : UNAVAILABLE;
      let rain_mn = data.entries[0].rain_mn ? `${data.entries[0].rain_mn}mm` : UNAVAILABLE;
      let luminosity = data.entries[0].luminosity || UNAVAILABLE;
      let timeUpdated = new Date(data.entries[0].time * 1000);
      let lastUpdated = new Date(data.entries[0].lasttime * 1000);
      let miniMapUrl = `http://www.findu.com/cgi-bin/radar-find.cgi?call=${callsign}`;
      message.channel.send({
        embeds: [
          new EmbedBuilder()
            .setColor(config.embed_color)
            .addFields([
              { name: 'Temp', value: temp },
              { name: 'Pressure', value: pressure },
              { name: 'Humidity', value: humidity },
              { name: 'Wind direction', value: wind_direction },
              { name: 'Wind speed', value: wind_speed },
              { name: 'Wind gust', value: wind_gust },
              { name: 'Rainfall past 1hr', value: rain_1h },
              { name: 'Rainfall past 24hrs', value: rain_24h },
              { name: 'Rainfall since midnight', value: rain_mn },
              { name: 'Luminosity', value: luminosity },
              { name: 'Time', value: timeUpdated.toLocaleString('en-US', DATE_OPTIONS) },
              { name: 'Last Updated', value: lastUpdated.toLocaleString('en-US', DATE_OPTIONS) },
            ])
            .setImage(miniMapUrl)
            .setTimestamp()
            .setFooter({ text: 'Source: https://aprs.fi' }),
        ],
      });
    }
  } catch (error) {
    return console.error(error);
  }
}
