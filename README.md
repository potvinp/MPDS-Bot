## MPDS Bot

MPDS Bot is a Discord bot designed to respond to queries of MPDS codes and return the correspending meaning. It supports both prefix-based commands and slash commands.

### Features
- Responds to queries using prefix-based syntax (`mpds QUERY_HERE`)
- Supports slash commands (`/mpds code:QUERY_HERE`)
- Easy configuration and data management through a JSON file

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Setup and Configuration](#setup-and-configuration)
3. [Running the Bot](#running-the-bot)

## Prerequisites
Before setting up the bot, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (version 20 or higher)
- [npm](https://www.npmjs.com/)

## Setup and Configuration

### 1. Clone the Repository
Clone the repository to your local machine:
```bash
git clone https://github.com/potvinp/MPDS-Bot.git
cd MPDS-Bot
```

### 2. Install Dependencies
Install the required dependencies using npm:
```bash
npm install
```

### 3. Create a `.env` File
Create a `.env` file in the root directory of the project and add your Discord bot token:
```
BOT_TOKEN=your-bot-token-here
```

Replace `your-bot-token-here` with your actual Discord bot token. You can get the bot token from the [Discord Developer Portal](https://discord.com/developers/applications).

## Running the Bot
To start the bot, run the following command in the project directory:
```bash
node index.js
```

The bot will log in and register the global slash command. Note that global slash commands can take up to an hour to propagate across all guilds.

## Usage
### Prefix-Based Command
Users can query the bot using the prefix-based command in any text channel:
```
mpds example1
```

### Slash Command
Users can also query the bot using the slash command:
```
/mpds code:example1
```

The bot will respond with the corresponding meaning from the `data.json` file.

## Support
For any issues or questions, please open an issue on the [GitHub repository](https://github.com/potvinp/MPDS-Bot).
