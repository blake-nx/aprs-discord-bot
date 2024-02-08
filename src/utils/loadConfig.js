import fsExtra from 'fs-extra';

function getEnv(name, fallback = null) {
  let val = process.env[name];
  if (val === undefined || val === null) {
    if (fallback !== null) {
      throw `Missing environment variale for ${name}`;
    }
    return fallback;
  }
  return val;
}

const jsonFile = new URL('../../config.json', import.meta.url);
let config;

// Support config.json for config values
if (fsExtra.existsSync(jsonFile)) {
  config = await fsExtra.readJson(jsonFile);
} else {
  // Allow environment variables to be defined as well for coinfig values
  config = {
    token: getEnv('BOT_DISCORD_TOKEN'),
    prefix: getEnv('BOT_MSG_PREFIX', '?'),
    aprs_token: getEnv('BOT_APRSFI_TOKEN'),
    gmaps_token: getEnv('BOT_GMAPS_TOKEN'),
    timezone: getEnv('BOT_TIMEZONE', 'America/Vancouver'),
    embed_color: getEnv('BOT_EMBED_COLOR', '#efefef'),
    user_agent: getEnv(
      'BOT_USER_AGENT',
      'aprs-discord-bot v1 (+https://github.com/brandonb927/aprs-discord-bot)'
    ),
  };
}

export default config;
