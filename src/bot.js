import {
  Client,
  Events,
  GatewayIntentBits,
  // PermissionFlagsBits,
  // OAuth2Scopes,
  ActivityType,
} from 'discord.js';
import { config } from './utils/loadConfig.js'
import { getLocationInfo } from './modules/getLocationInfo.js';
import { getWeather } from './modules/getWeather.js';

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on(Events.Error, (e) => {
  console.error(e);
});

client.on(Events.ClientReady, async () => {
  // const inviteLink = await client
  //   .generateInvite({
  //     permissions: [
  //       PermissionFlagsBits.AttachFiles,
  //       PermissionFlagsBits.EmbedLinks,
  //       PermissionFlagsBits.ReadMessageHistory,
  //       PermissionFlagsBits.SendMessages,
  //     ],
  //     scopes: [OAuth2Scopes.Bot],
  //   });
  // console.log(`Invite link: ${inviteLink}`);
  // console.log(
  //   `APRS Bot firing up with ${client.users.cache.size} users, in ${client.channels.cache.size} channels of ${client.guilds.cache.size} guilds.`
  // );
  console.log(`APRS Bot ready!`);
  client.user.setActivity('Stations', { type: ActivityType.Watching });
});

client.on(Events.MessageCreate, (message) => {
  // Prevent botception!
  if (!message.content.startsWith(config.prefix) || message.author.bot) return;

  const args = message.content.slice(config.prefix.length).trim().split(/\s+/g);
  const command = args.shift().toLowerCase();
  let callsign;
  switch (command) {
    case 'loc':
      callsign = args[0];
      getLocationInfo(callsign, message);
      break;
    case 'weather':
    case 'wx':
      callsign = args[0];
      getWeather(callsign, message);
      break;
    case 'help':
      message.channel.send(
        `**Currently available commands**:
\`${config.prefix}loc callsign\` to retrieve location information.
\`${config.prefix}wx callsign\` to retrieve weather data.`
      );
      break;
    default:
      break;
  }
});

client.login(config.token);
