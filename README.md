# APRS Discord Bot

Discord.js bot for retrieving station data from https://aprs.fi
!["Bot Snapshot"](https://i.imgur.com/zEMXdkY.png)

## Installation

1. [Follow the guide here for creating your bot](https://anidiots.guide/getting-started/getting-started-long-version)
2. Clone this repository locally
3. Navigate to the bot directory and run `npm ci`
4. Rename `config.example.json` to `config.json` and replace the tokens, timezone, and embed color with your own.
5. Using Node.js v18.16.0, run `src/node bot.js`

## Commands

- `?loc callsign` to retrieve location information.
- `?wx callsign` to retrieve weather data.

Replace `callsign` with your device's callsign.

## Todos

- Handle empty/additional fields in the response data for different types of stations
