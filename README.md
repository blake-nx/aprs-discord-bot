# APRS Discord Bot

Discord.js bot for retrieving station data from https://aprs.fi
!["Bot Snapshot"](https://i.imgur.com/zEMXdkY.png)

## Usage

You can use this code as a docker image, or run it from the source (see The next section).

A docker image of the latest `master` build is available on the GitHub Container Registry.

## Installation

1. [Follow the guide here for creating your bot](https://anidiots.guide/getting-started/getting-started-long-version)
1. Clone this repository locally
1. Install [`asdf`](https://github.com/asdf-vm/asdf/) with the [`asdf-nodejs`](https://github.com/asdf-vm/asdf-nodejs) plugin (or run ensure the version of node in the `.tool-versions` is available to you)
1. Install dependencies with `npm ci`
1. Rename `config.example.json` to `config.json` and replace the tokens, timezone, and embed color with your own.
    OR
    Define the following environment variables when running the bot directly, or in a `.env` file for use with the Docker image:

    ```txt
    # Fallbacks available in loadConfig.js
    BOT_DISCORD_TOKEN=... # Discord API token
    BOT_MSG_PREFIX=... # Message prefix the bot will listen for
    BOT_APRSFI_TOKEN=... # APRS.fi API key
    BOT_GMAPS_TOKEN=... # Google Maps API key
    BOT_TIMEZONE=... # Timezone string
    BOT_EMBED_COLOR=... # Message embed colour
    BOT_USER_AGENT=... # User agent sent with network requests
    ```

1. Run `npm run start`

## Commands

- `?loc callsign` to retrieve location information.
- `?messages callsign` to retrieve latest ten APRS messages for the given callsign.
- `?wx callsign` to retrieve weather data (or `?weather`).

Replace `callsign` with your device's callsign.

## Contributing

1. Run `npm run start:dev` to have the bot code refresh when changes are made

Build the docker image with: `docker build -t aprs-discord-bot .` and run it with `docker run --env-file .env aprs-discord-bot`

## TODOs

- Handle empty/additional fields in the response data for different types of stations
