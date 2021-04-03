// Requirements
require("dotenv").config();
const { Client, MessageEmbed, Channel } = require("discord.js");

// Create required variables
const client = new Client({partials: ["MESSAGE", "REACTION"]});
const prefix = "-";
const adminRoles = [];
const roleReactMsg = "827434586589102110";
const loggingChannel = "709891365709938728";

// Start Message
client.on('ready', () => {
    console.log("Undercover bot is online @ " + client.readyAt + ".");
});
  

// Commands
client.on('message', async message => {
    if (message.author.bot) return; // If message was sent by a got ignore
    if (message.content.startsWith(prefix)){ // If the message was sent with the prefix
        // Split Command
        const [cmd, ...args] = message.content.trim().substring(prefix.length).split(/\s+/);

        //Ping Command
        if(cmd === "ping"){
            try {
                message.channel.send("<@"+message.author.id+"> pong!");
            } catch (error) {
                console.log("Error sending message for ping command: " + Date());
                console.log(error);
            }
        }

        // Send Role React Message Command
        else if(cmd === "reactMsg" && message.author.id === "277186846117724160"){
            message.delete();

            const embed = new MessageEmbed()
                .setTitle("Reaction roles")
                .setColor(0xff0000)
                .setDescription("<:YouTube:709605862985039872> : I am a YouTuber\n<:twitch_streamer:709581340382724246> : I am a Twitch Streamer\n:page_facing_up: : Notify me about: **Miscellaneous (including twitch channel updates, etc)**\n:circus_tent: : Notify me about: **Events (including stream events)**\n:camera_with_flash: : Notify me about: **YouTube Videos**")
                .setFooter(`${client.user.username}`, "https://i.imgur.com/k6EqY8f.png");

            try {
                message.channel.send(embed);
            } catch (error) {
                console.log("Error sending message for reactMsg command: " + Date());
                console.log(error);
            }
        }

        // Help Command
        else if(cmd === "help") {
            const embed = new MessageEmbed()
                .setTitle("Undercover Bot Help Menu")
                .setColor(2072139)
                .setDescription('*Server Prefix is "-"*')
                .addField("Basic Commands", "**-help**  Displays a list of commands and gives a description.\n\n**-ping**  Command checks if the bot is online by making the bot send a message.", true)
                .addField("Other Bot Roles", "**Role Giver:**  This bot gives you toles when you react to a message in <#709887008318816317>.", true)
                .setFooter(`${client.user.username}`, "https://i.imgur.com/k6EqY8f.png");

            try {
                message.channel.send(embed);
                message.delete();
            } catch (error) {
                console.log("Error sending message for help command: " + Date());
                console.log(error);
            }
        }

        // Admin Commands
        for(let x = 0;x>adminRoles.length;x++){
            if(message.member.roles.cache.has(adminRoles[x])){
                // Kick command
                if(cmd === "kick"){
                    try {
                        let member = message.mentions.members.first();
                        const reason = args[1, args.length-1].join(" ")+".";
                        member.kick(reason);
                        message.delete();
                        const embed = new MessageEmbed()
                            .setTitle("Undercover Bot ")
                            .setColor(2072139)
                            .setDescription("<@"+member.id+"> was kicked: " + reason)
                            .setFooter(`${client.user.username}`, "https://i.imgur.com/k6EqY8f.png");
                        message.channel.send(embed);
                    } catch (error) {
                        console.log("Error occured when kicking <@"+member.id+">. " + Date());
                        console.log(error);
                    }
                }

                // Ban command
                else if(cmd === "ban"){
                    try {
                        let member = message.mentions.members.first();
                        const reason = args[1, args.length-1].join(" ")+".";
                        member.ban(reason);
                        message.delete();
                        const embed = new MessageEmbed()
                            .setTitle("Undercover Bot ")
                            .setColor(2072139)
                            .setDescription("<@"+member.id+"> was banned: " + reason)
                            .setFooter(`${client.user.username}`, "https://i.imgur.com/k6EqY8f.png");
                        message.channel.send(embed);
                    } catch (error) {
                        console.log("Error occured when banning <@"+member.id+">. " + Date());
                        console.log(error);
                    }
                }

                // Purge command
                else if(cmd === "purge"){
                    await message.channel.bulkDelete(parseInt(args[0]) + 1)
                        .catch(err => {
                            console.log("Error occured when purgin messaged: " + Date())
                            console.log(err);
                        });
                }
            } else if(cmd === "kick" || cmd === "ban" || cmd === "purge"){
                message.channel.send("That's an admin command dummy.");
            }
        }
    }

});

// On Reaction Add
client.on("messageReactionAdd", async (reaction, user) => {
    const { name } = reaction.emoji;
    const member = reaction.message.guild.members.cache.get(user.id);

    // Role React
    if (reaction.message.id === roleReactMsg){
        switch (name) {
            case "YouTube":
                try {
                    member.roles.add("709529044072267906"); // YouTuber Role
                } catch (error) {
                    console.log("Error adding role Youtuber to @<"+user.id+">: " + Date());
                    console.log(error);
                }
                break;
            case "twitch_streamer":
                try {
                    member.roles.add("709528954305904650"); // Twitch Streamer Role
                } catch (error) {
                    console.log("Error adding role Twitch Streamere to @<"+user.id+">: " + Date());
                    console.log(error);
                }
                break;
            case "📄":
                try {
                    member.roles.add("732529645206896680"); // Announce Misc Role
                } catch (error) {
                    console.log("Error adding role announce misc to @<"+user.id+">: " + Date());
                    console.log(error);
                }
                break;
            case "🎪":
                try {
                    member.roles.add("732529543646019675"); // Announce Events Role
                } catch (error) {
                    console.log("Error adding role announce events to @<"+user.id+">: " + Date());
                    console.log(error);
                }
                break;
            case "📸":
                try {
                    member.roles.add("709887160936824852"); // Anounce YouTube Videos
                } catch (error) {
                    console.log("Error adding role announce youtube vids to @<"+user.id+">: " + Date());
                    console.log(error);
                }
                break;
        }
    }
}); 

// On reaction remove
client.on("messageReactionRemove", async (reaction, user) => {
    const { name } = reaction.emoji;
    const member = reaction.message.guild.members.cache.get(user.id);

    // Role React
    if (reaction.message.id === roleReactMsg){
        switch (name) {
            case "YouTube":
                try {
                    member.roles.remove("709529044072267906"); // YouTuber Role
                } catch (error) {
                    console.log("Error removing role Youtuber from @<"+user.id+">: " + Date());
                    console.log(error);
                }
                break;
            case "twitch_streamer":
                try {
                    member.roles.remove("709528954305904650"); // Twitch Streamer Role
                } catch (error) {
                    console.log("Error removing role Twitch Streamere from @<"+user.id+">: " + Date());
                    console.log(error);
                }
                break;
            case "📄":
                try {
                    member.roles.remove("732529645206896680"); // Announce Misc Role
                } catch (error) {
                    console.log("Error removing role announce misc from @<"+user.id+">: " + Date());
                    console.log(error);
                }
                break;
            case "🎪":
                try {
                    member.roles.remove("732529543646019675"); // Announce Events Role
                } catch (error) {
                    console.log("Error removing role announce events from @<"+user.id+">: " + Date());
                    console.log(error);
                }
                break;
            case "📸":
                try {
                    member.roles.remove("709887160936824852"); // Anounce YouTube Videos
                } catch (error) {
                    console.log("Error removing role announce youtube vids from @<"+user.id+">: " + Date());
                    console.log(error);
                }
                break;
        }
    }
}); 

// Logging
client.on("channelPinsUpdate", async (channel, time) => { // Channel Pins
    const embed = new MessageEmbed()
        .setTitle("Channel Pins Updated")
        .setColor(9427684)
        .setDescription("New channel pin in <#"+ channel.id +">")
        .setFooter(`${client.user.username}`, "https://i.imgur.com/k6EqY8f.png");
    try {
        client.channels.cache.get(loggingChannel).send(embed);
    } catch (error) {
        console.log("Error sending log for channel pins updated: " + Date());
        console.log(embed.description);
    }
});
client.on("guildMemberRemove", async member => { // Member Left
    const embed = new MessageEmbed()
        .setTitle("Member Left")
        .setColor(9427684)
        .setDescription("<@"+ member.id +"> left the server.")
        .setFooter(`${client.user.username}`, "https://i.imgur.com/k6EqY8f.png");
    try {
        client.channels.cache.get(loggingChannel).send(embed);
    } catch (error) {
        console.log("Error sending log for user leaving: " + Date());
        console.log(embed.description);
    }
});
client.on("inviteDelete", async invite => { // Invite Deleted
    const embed = new MessageEmbed()
        .setTitle("Invite Deleted")
        .setColor(9427684)
        .setDescription("Invite Deleted:\n"+invite.channel+"\n["+invite.url+"]("+invite.url+")")
        .setFooter(`${client.user.username}`, "https://i.imgur.com/k6EqY8f.png");
    try {
        client.channels.cache.get(loggingChannel).send(embed);
    } catch (error) {
        console.log("Error sending log for invite deleted: " + Date());
        console.log(embed.description);
    }
});
client.on("messageDelete", async message => { // Message Deleted
    const embed = new MessageEmbed()
        .setTitle("Message Deleted")
        .setColor(9427684)
        .setDescription("<@"+message.author.id+"> **in** <#"+message.channel.id+">\n"+message.content)
        .setFooter(`${client.user.username}`, "https://i.imgur.com/k6EqY8f.png");
    try {
        client.channels.cache.get(loggingChannel).send(embed);
    } catch (error) {
        console.log("Error sending log for message deleted: " + Date());
        console.log(embed.description);
    }
});
client.on("messageUpdate", async (oldM, newM) => { // Message Edited
    const embed = new MessageEmbed()
        .setTitle("Message Edited")
        .setColor(9427684)
        .setDescription("Message from <@"+oldM.author.id+"> in <#"+oldM.channel.id+"> edited\n**Old:** "+oldM.content+"\n**New:** "+newM.content)
        .setFooter(`${client.user.username}`, "https://i.imgur.com/k6EqY8f.png");
    try {
        client.channels.cache.get(loggingChannel).send(embed);
    } catch (error) {
        console.log("Error sending log for message upated: " + Date());
        console.log(embed.description);
    }
});
client.on("guildBanRemove", async (guild, user) => { // Ban Remove
    const embed = new MessageEmbed()
        .setTitle("Ban Removed")
        .setColor(9427684)
        .setDescription("<@"+user.id+"> was unbanned.")
        .setFooter(`${client.user.username}`, "https://i.imgur.com/k6EqY8f.png");
    try {
        client.channels.cache.get(loggingChannel).send(embed);
    } catch (error) {
        console.log("Error sending log for member unbanned: " + Date());
        console.log(embed.description);
    }
});
client.on("userUpdate", async (oldM, newM) => { // User Updated (Name)
    if(oldM.username !== newM.username){
        const embed = new MessageEmbed()
            .setTitle("userUpdate")
            .setColor(9427684)
            .setDescription("<@"+newM.id+"> renamed.\n**Old:** "+oldM.username+"\n**New:** "+newM.username)
            .setFooter(`${client.user.username}`, "https://i.imgur.com/k6EqY8f.png");
        try {
            client.channels.cache.get(loggingChannel).send(embed);
        } catch (error) {
            console.log("Error sending log for member changedd: " + Date());
            console.log(embed.description);
        }
    }
});

// Run bot
client.login(process.env.DISCORDJS_BOT_TOKEN);
