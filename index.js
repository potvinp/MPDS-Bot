require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const fs = require('fs');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });

const prefix = "mpds ";
let data;

fs.readFile('data.json', (err, jsonData) => {
  if (err) {
    console.error('Error reading data.json:', err);
    return;
  }
  data = JSON.parse(jsonData);
  console.log('Data loaded:', data);
});

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);

  client.application.commands.create({
    name: 'mpds',
    description: 'Query the data by code',
    options: [
      {
        name: 'code',
        type: 3,
        description: 'The code to search for',
        required: true,
      },
    ],
  })
  .then(() => console.log('Slash command registered globally.'))
  .catch(console.error);
});

client.on('messageCreate', async message => {
  if (message.content.startsWith(prefix)) {
    const query = message.content.slice(prefix.length).trim().toUpperCase();
    console.log('Received query:', query);
    const result = data.find(item => item.code.toUpperCase() === query);
    console.log('Query result:', result);
    if (result) {
      message.channel.send(result.meaning);
    } else {
      message.channel.send("No results found.");
    }
  }
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const { commandName, options } = interaction;

  if (commandName === 'mpds') {
    const query = options.getString('code').toUpperCase();
    console.log('Received query:', query);
    const result = data.find(item => item.code.toUpperCase() === query);
    console.log('Query result:', result);
    if (result) {
      await interaction.reply(result.meaning);
    } else {
      await interaction.reply("No results found.");
    }
  }
});

client.login(process.env.BOT_TOKEN);
