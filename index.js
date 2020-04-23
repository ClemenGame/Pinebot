const Discord = require('discord.js');
const {Client, Attachment} = require('discord.js');
const bot = new Client();

const token = 'NzAwMTkwNDE3Mzc0Njc1MDAx.XpfVaA.kmCb-BsHrr7VAf5brQLjBE_bkIs';

const PREFIX = ')';

bot.on('guildMemberAdd', member =>{
    const channel = member.guild.channels.find(channel => channel.name === "welcome");
    if(!channel) return;

    channel.send("Well hello there $(member), welcome to our the party.")
});

bot.on('ready', () =>{
    console.log('PineBot is now online');
    bot.user.setActivity('Type *)help* for more info.')
})

bot.on('message', message=>{
    
    let args = message.content.substring(PREFIX.length).split(" ");

    switch(args[0]){
        case 'pepe':
            const attachment = new Attachment("https://imgur.com/r/pepe/TXm5TEk")
            message.channel.send(message.author, attachment);
        case 'help':
            const help = new Discord.MessageEmbed()
            .setTitle('PineBot Commands:')
            .addField('Information Command', '*)info help*, *)info server*, *)info bot( or pinebot )*, *)info version*', true)
            .addField('Other Commands', '*)help*, *)myself*, *)server*, *)prefix*', true)
            .addDescription('This is a Private Bot, ask Clemen#6956 to invite this bot to your server')
            .setColor(0x7475F9)
            .setFooter('Showing a list of commands.')
            message.channel.send(help);
            break;
        case 'help':
            message.channel.send('The bot is still in a WIP state.');
        break;
        case 'server':
            message.channel.send('Server is stable.')
            break;
        case 'prefix':
            message.channel.send('The prefix is ^)^.')
            break;
        case 'info':
            if(args[1] === 'server'){
                message.channel.send('The Server is owned by Block#4200 to make many games');
            }else{if(args[1] === 'version'){
                message.channel.send('This is version 1.0.1')
            }else{
                if(args[1] === 'pinebot'){
                    message.channel.send('The Pinebot is a project made by Clemen#6056 and Block#4200')
                }else{if(args[1] === 'bot'){
                    message.channel.send('The Pinebot is a project made by Clemen#6056 and Block#4200')
                }else{if(args[1] === 'help'){
                    message.channel.send('<bot><pinebot><server><version><help>')
                }else
                    message.channel.send('Invalid parameters, commands are avalable on *)info help*.')
            }
            }
            }
                
            }
        case 'myself':
            const embed = new Discord.MessageEmbed()
            .setTitle('User Information')
            .addField('Name', message.author.username)
            .addField('Current Server', message.guild.name)
            .setColor(0x7475F9)
            .setThumbnail(message.author.avatarURL())
            message.channel.send(embed);    
    }
    
})


bot.login(token);