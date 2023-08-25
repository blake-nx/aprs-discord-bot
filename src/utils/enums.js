import { loadJSON } from '../utils/loadJSON.js';

const config = await loadJSON('../../config.json');

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
