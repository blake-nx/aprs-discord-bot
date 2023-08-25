import config from './config.json';
import Discord from 'discord.js';
import getLocationInfo from './src/modules/getLocationInfo';
import getWeather from './src/modules/getWeather';

const client = new Discord.Client();

client.on('error', (e) => {
  console.error(e);
  return;
});

client.on('ready', () => {
  client
    .generateInvite(['SEND_MESSAGES', 'READ_MESSAGES', 'EMBED_LINKS', 'ATTACH_FILES'])
    .then((link) => {
      console.log(link);
    });
  console.log(
    `APRS Bot firing up with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`
  );
  return client.user.setActivity('Stations', { type: 'Watching' });
});

client.on('message', (message) => {
  if (message.author.bot) return;
  if (message.content.indexOf(config.prefix) !== 0) return;
  let callsign;
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift();
  switch (command) {
    case 'loc':
      callsign = args.join('').toLowerCase();
      getLocationInfo(callsign, message);
      return;
    case 'weather':
    case 'wx':
      callsign = args.join('').toLowerCase();
      getWeather(callsign, message);

      return;
    case 'help':
      message.channel.send(
        '**Currently available commands**:\n`?loc callsign` to retrieve location information.\n`?wx callsign` to retrieve weather data.'
      );
      return;
    default:
      break;
  }
});

client.login(config.token);