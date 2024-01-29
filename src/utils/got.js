import got from 'got';
import config from './loadConfig.js';

export default got.extend({
  prefixUrl: 'https://api.aprs.fi/api/',
  headers: {
    'user-agent': config.user_agent,
  },
});
