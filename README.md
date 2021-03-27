# Paintbot client in JavaScript

This is a Paintbot Client written in JavaScript (ECMAScript 2020)

For more information about what Paintbot is, see: https://paintbot.cygni.se/

For running your own server, see [Paintbot Server Repository](https://github.com/cygni/paintbot).

## Requirements

- Yarn or npm
- Paintbot Server (local or remote, there's one running by Cygni so no worries ;) )

## Installation

First off, clone the repository.

```
git clone git@github.com:cygni/paintbot-client-js.git
```

Open the directory of your newly cloned project.

```
cd paintbot-client-js/
```

Now, install it with either yarn or npm.

```bash
# with yarn
yarn

# with npm
npm install
```

## Usage

To run a training game:

```bash
# with yarn
yarn start

# with npm
npm start
```

You can supply the path of your bot as an argument, e.g.:

```bash
yarn start ./bot/bot.js
```

The default path is "./bot/bot.js".

There are also some other options:

- `--host [url]` The server to connect to (default is "wss://server.paintbot.cygni.se")
- `--venue [name]` Which venue to use (default is "training")
- `--no-autostart` Do not automatically start the game

### Tournament mode

When the time comes for the real game to start, connect to it by setting the venue flag to "tournament", e.g.:

```
yarn start ./bot/bot.js --venue tournament
```

## Implementation

You only need to implement one function in order to have your own bot up and running: `getNextMove`.

For every `mapUpdateEvent` received, you are expected to reply with an Action (UP, DOWN, LEFT, RIGHT, STAY or EXPLODE).

Have a look at the [example bot](bot/bot.js) to get an idea of how it's done.

### Helper functions

There's a utility class with nifty methods to help you out. Take a look at [`MapUtility`](src/utils.js) and what it offers.
