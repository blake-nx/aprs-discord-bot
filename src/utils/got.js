import got from 'got';

export default got.extend({
  prefixUrl: 'https://api.aprs.fi/api/',
  headers: {
    'user-agent': `aprs-discord-bot v1 (+https://github.com/brandonb927/aprs-discord-bot)`,
  },
});
