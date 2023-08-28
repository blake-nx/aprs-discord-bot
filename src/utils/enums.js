import { config } from './loadConfig.js'

export const DATE_OPTIONS = {
  weekday: 'short',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  timeZone: config.timezone,
};

export const UNAVAILABLE = 'Unavailable';
