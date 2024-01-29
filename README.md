# APRS Discord Bot

Discord.js bot for retrieving station data from https://aprs.fi
!["Bot Snapshot"](https://i.imgur.com/zEMXdkY.png)

## Installation

1. [Follow the guide here for creating your bot](https://anidiots.guide/getting-started/getting-started-long-version)
1. Clone this repository locally
1. Install [`asdf`](https://github.com/asdf-vm/asdf/) with the [`asdf-nodejs`](https://github.com/asdf-vm/asdf-nodejs) plugin (or run ensure the version of node in the `.tool-versions` is available to you)
1. Install dependencies with `npm ci`
1. Rename `config.example.json` to `config.json` and replace the tokens, timezone, and embed color with your own.
1. Run `npm run start`

## Commands

- `?loc callsign` to retrieve location information.
- `?messages callsign` to retrieve location information.
- `?wx callsign` to retrieve weather data (or `?weather`).

Replace `callsign` with your device's callsign.

## Contributing

1. Run `npm run start:dev` to have the bot code refresh when changes are made

## TODOs

- Handle empty/additional fields in the response data for different types of stations
