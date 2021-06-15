// Requirements
require("dotenv").config();
const { Client, MessageEmbed, Channel } = require("discord.js");

// Create required variables
const client = new Client({partials: ["MESSAGE", "REACTION"]});
const prefix = "-";
const roleReactMsg = "827434586589102110";


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
                try {
                    message.channel.send("Something went wrong.");
                } catch (error) {
                    console.log("Couldn't send error message to discord.");
                    console.log(error);
                }
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
                try {
                    message.channel.send("Something went wrong.");
                } catch (error) {
                    console.log("Couldn't send error message to discord.");
                    console.log(error);
                }
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
                try {
                    message.channel.send("Something went wrong.");
                } catch (error) {
                    console.log("Couldn't send error message to discord.");
                    console.log(error);
                }
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
                    reaction.remove;
                }
                break;
            case "twitch_streamer":
                try {
                    member.roles.add("709528954305904650"); // Twitch Streamer Role
                } catch (error) {
                    console.log("Error adding role Twitch Streamere to @<"+user.id+">: " + Date());
                    console.log(error);
                    reaction.remove;
                }
                break;
            case "📄":
                try {
                    member.roles.add("732529645206896680"); // Announce Misc Role
                } catch (error) {
                    console.log("Error adding role announce misc to @<"+user.id+">: " + Date());
                    console.log(error);
                    reaction.remove;
                }
                break;
            case "🎪":
                try {
                    member.roles.add("732529543646019675"); // Announce Events Role
                } catch (error) {
                    console.log("Error adding role announce events to @<"+user.id+">: " + Date());
                    console.log(error);
                    reaction.remove;
                }
                break;
            case "📸":
                try {
                    member.roles.add("709887160936824852"); // Anounce YouTube Videos
                } catch (error) {
                    console.log("Error adding role announce youtube vids to @<"+user.id+">: " + Date());
                    console.log(error);
                    reaction.remove;
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


// Run bot
client.login(process.env.DISCORDJS_BOT_TOKEN);
