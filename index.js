const Discord = require('discord.js');
const { Client, Attachment } = require('discord.js');
const bot = new Client();

const token = 'NzAwMTkwNDE3Mzc0Njc1MDAx.XqJxdQ.SPpuCfOELkZTeo2aS2LAgv_5wrc';

const PREFIX = ')';

var servers = {};

const ytdl = ("ytdl-core");

bot.on('guildMemberAdd', member => {
    const channel = member.guild.channels.find(channel => channel.name === "welcome");
    if (!channel) return;

    channel.send("Well hello there $(member), welcome to our party.")
});

bot.on('ready', () => {
    console.log('PineBot is now online');
    bot.user.setActivity(')help')
})

bot.on('message', message => {

    let args = message.content.substring(PREFIX.length).split(" ");

    switch (args[0]){
        case 'play':
            function play(connection, message){
                var server = servers[message.guild.id];

                server.dispatcher = connection.play(ytdl(server.queue[0], {filter: "audioonly"}));

                server.queue.shift();

                server.dispatcher.on("end", function(){
                    if(server.queue[0]){
                        play(connection, message);
                    }else {
                        connection.disconnect;
                    }
                })
            }
            if(!args[1]){
                message.channel.send("You need to provide a link!");
                return;
            }
            if(!message.member.voice.channel){
                message.channel.send('You must be in #musicchat to play a song');
                return;
            }
            if(!servers[message.guild.id]) servers[message.guild.id] = {
                queue: []
            }
            var server = servers[message.guild.id];

            server.queue.push(args[1]);

            if(!message.guild.voice.connection) message.member.voice.channel.join().then(function(connection){
                play(connection, message);

            })
        case 'credits':
            const hel1p = new Discord.MessageEmbed()
            .setTitle('***Help*** Commands')
            .addField('**Bot** ***Makers:***', '**Clemen#4200**, **Block#4200**')
            .addField('**Contributors:**', '**NONE**')
            .setFooter('Made by Clemen#6956 BlockLua#4200')
            .setColor(0xFFFF00)
            message.channel.send(hel1p);
        break;
        case 'server':
            message.channel.send('Server is stable.')
            break;
        case 'prefix':
            message.channel.send('The prefix is `)`.')
            break;
        case 'info':
            if (args[1] === 'server') {
                message.channel.send('The Server is owned by Block#4200 to make many games');
            } else {
                if (args[1] === 'version') {
                    message.channel.send('This is version 1.0.1')
                } else {
                    if (args[1] === 'pinebot') {
                        message.channel.send('The Pinebot is a project made by Clemen#6056 and Block#4200')
                    } else {
                        if (args[1] === 'bot') {
                            message.channel.send('The Pinebot is a project made by Clemen#6056 and Block#4200')
                        } else {
                            if (args[1] === 'help') {
                                const help = new Discord.MessageEmbed()
                                .setTitle('***Info Help*** Commands')
                                .addField('**Commands:**', '**)info bot**, **)info help**, **)info server**, **)info version**, **)info pinebot**')
                                .setFooter('Made by Clemen#6956 BlockLua#4200')
                                .setColor(0xFFFF00)
                                message.channel.send(help);
                            } else
                                message.channel.send('Invalid parameters, commands are avalable on *)info help*.')
                        }
                    }
                }

            }
            break;
        case 'myself':
            const embed = new Discord.MessageEmbed()
                .setTitle('Self Information')
                .addField('Name', message.author.username)
                .addField('Current Server', message.guild.name)
                .setColor(0x7475F9)
                .setThumbnail(message.author.avatarURL())
                .setFooter('Made by Clemen#6956 BlockLua#4200')
            message.channel.send(embed);
            break;
        case 'kick':
            if(!message.member.hasPermission("OWNER", explicit = true) || !message.member.hasPermission("EXPERIENCED_ADMIN", explicit = true) || !message.member.hasPermission("ADMIN", explicit = true)) return message.channel.send("YOU DON\'T HAVE THE PERMISSION TO USE THIS COMMAND")
            const user = message.mentions.users.first();

            if (user){
                const member = message.guild.member(user);
                
                if (member){
                    member.kick('You were kicked!').then(()=>{
                        message.reply(`Successfully kicked ${user.tag}`);
                    }).catch(err =>{
                        message.reply('Unable to kick member!');
                        console.log(err);
                    });
                } else{
                    message.reply("That user isn\'t in this server!")
                }
            } else{
                message.reply('You need to **specify** a ***member!***')
            }

        break;
        case 'help':
            const help = new Discord.MessageEmbed()
            .setTitle('***Help*** Commands')
            .addField('**Starter** ***Info*** **Cmds:**', '**)info help**')
            .addField('**Normal Cmds:**', '**)prefix**, **)server**, **)myself**, **)credits**')
            .setFooter('Made by Clemen#6956 BlockLua#4200')
            .setColor(0xFFFF00)
            message.channel.send(help);
        break;
        case 'admin-help':
            if(!message.member.hasPermission("OWNER") || !message.member.hasPermission("ADMIN") || (!message.member.hasPermission("EXPERIENCE_ADMIN"))) return message.reply("You don\'t have the permission to use this command!");
                    const help2 = new Discord.MessageEmbed() 
                    .setTitle('***Admin*** Commands')
                    .addField('**Commands:**', '**)kick (user)**, **)ban (user)**, **)bh**, **)blackhole**')
                    .setColor(0x0080FF)
                    message.author.send(help2);
        break;
        case 'ban':
            if(!message.member.hasPermission("BAN_MEMBERS")) return message.reply('Sorry you do not have permission!');
            let member = message.mentions.members.first();
            if(!member) return message.reply("You need to **specify** a ***member!***");
            if(!member.bannable) return message.channel.send("Sorry I cannot ban that person! Do they have a higher role?");
     
            let reason = args.slice(1).join(' ');
            if(!reason) reason = "No reason provided";
     
            async ;member.ban(reason)
                .catch(e => message.reply('Sorry I couldn\'t ban them! Error: ${e}')); 
                message.reply('User banned!');
        break;
        }
            })


bot.login(token);
