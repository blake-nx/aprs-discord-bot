import request from 'request';
import config from '../config.json';
import Discord from 'discord.js';

let dateOptions = {
  weekday: 'short',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  timeZone: config.timezone,
};

export default function getLocationInfo(callsign, message) {
  request.get(
    `https://api.aprs.fi/api/get?name=${callsign}&what=loc&apikey=${config.aprs_token}&format=json`,
    function (error, res, body) {
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
        let lat = data.entries[0].lat;
        let lng = data.entries[0].lng;
        let altitude = data.entries[0].altitude
          ? `${data.entries[0].altitude}m (${Math.round(data.entries[0].altitude * 3.28084)}ft)`
          : 'Not available';
        let coords = `${lat},${lng}`;
        let timeUpdated = new Date(data.entries[0].time * 1000);
        let miniMapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${coords}&zoom=13&size=600x300&maptype=roadmap&markers=color:blue|${coords}&key=${config.gmaps_token}`;
        let locationEmbed = new Discord.RichEmbed()
          .setColor(config.embed_color)
          .setAuthor('APRS Bot')
          .addField('Coordinates', coords)
          .addField('Altitude', altitude)
          .addField('Time', timeUpdated.toLocaleString('en-US', dateOptions))
          .addField('Gmaps', `https://www.google.com/maps/search/?api=1&query=${coords}`)
          .setImage(miniMapUrl)
          .setTimestamp()
          .setFooter('Data sourced from https://aprs.fi/');
        message.channel.send({ embed: locationEmbed });
        return;
      }
    }
  );
}
