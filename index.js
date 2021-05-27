const Discord = require('discord.js')
const client = new Discord.Client();

const fetch = require('node-fetch')

let prefix = 'h!'

client.once('ready', () => {
	console.log('Ready to run!');
  client.user.setActivity('h!help for gif');
});

client.on('message', async message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content
		.slice(prefix.length)
		.trim()
		.split(/ +/);
	const command = args.shift().toLowerCase();

  //hentai
  if (command === 'hentai' || command === 'ht') {
    
    try {
      const { url } = await fetch('https://nekos.life/api/v2/img/Random_hentai_gif').then(response =>
			response.json()
		);

    let embed = new Discord.MessageEmbed()
      .setColor('RANDOM')
      .setAuthor('Here your gif')
      .setImage(url)
      .setFooter('Thanks nekos.life for the gif', message.author.displayAvatarURL())

      if (message.channel.nsfw) {
        return message.channel.send(embed)
      } else {
        return message.reply('NSFW channel only')
      }
    } catch(error) {
      console.log(error)
      message.reply('an error occurred while trying to run this command, maybe the API break ?')
    }     
  }

  //status
  if (command === 'status') {
    let ping = Math.round(message.client.ws.ping);

		//Credit to EvoBot
		let seconds = Math.floor(message.client.uptime / 1000);
		let minutes = Math.floor(seconds / 60);
		let hours = Math.floor(minutes / 60);
		let days = Math.floor(hours / 24);

		seconds %= 60;
		minutes %= 60;
		hours %= 24;

		let embed = new Discord.MessageEmbed()
			.setColor('RANDOM')
			.setAuthor('Bot status')
			.addField(`Prefix:`, `${prefix}`, true)
			.addField(`Ping:`, `${ping}ms`, true)
			.setFooter(`Uptime: ${days}d ${hours}h ${minutes}m`, message.author.displayAvatarURL())

      message.channel.send(embed)
		
  }

  //help
  if (command === 'help') {
    let embed = new Discord.MessageEmbed()
			.setColor('YELLOW')
			.setAuthor('Commands')
			.addField('`ht`', 'Random hentai gif')
      .addField('`status`', 'Bot status')
      .addField('`help`', 'This message')
			.setFooter(`Use ${prefix}<command> `, message.author.displayAvatarURL());

		message.channel.send(embed);
  }
});

let token = process.env['TOKEN'];
client.login(token);