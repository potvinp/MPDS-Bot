require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });

const prefix = "mpds ";
let data = [];

// Function to fetch data from the URL
const fetchData = async () => {
  try {
    const fetch = (await import('node-fetch')).default;
    const response = await fetch('https://raw.githubusercontent.com/potvinp/MPDS-Bot/master/data.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const jsonData = await response.json();
    data = jsonData; // Update the data in memory
    console.log('Data loaded:', data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

// Fetch data immediately and then every 12 hours
fetchData();
setInterval(fetchData, 12 * 60 * 60 * 1000);

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
    const query = message.content.slice(prefix.length).trim().normalize('NFC').toUpperCase();
    console.log('Received query:', query);
    const result = data.find(item => item.code.normalize('NFC').toUpperCase() === query);
    console.log('Query result:', result);
    if (result) {
      message.channel.send(`${result.code} - ${result.meaning}`);
    } else {
      message.channel.send("No results found.");
    }
  }
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const { commandName, options } = interaction;

  if (commandName === 'mpds') {
    const query = options.getString('code').normalize('NFC').toUpperCase();
    console.log('Received query:', query);
    const result = data.find(item => item.code.normalize('NFC').toUpperCase() === query);
    console.log('Query result:', result);
    if (result) {
      await interaction.reply(`${result.code} - ${result.meaning}`);
    } else {
      await interaction.reply("No results found.");
    }
  }
});

client.login(process.env.BOT_TOKEN);
