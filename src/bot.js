// Requirements
require("dotenv").config();
const { Client, MessageEmbed, Message, Guild } = require("discord.js");

// Create required variables
const client = new Client({
    partials: ["MESSAGE", "REACTION"]
});
const prefix = ".";
const roleReactMsg = "827434586589102110";

// Start Message
client.on('ready', () => {
    console.log("Undercover bot is online @ " + client.readyAt + ".");
});
  

// Reaction Panel Send Command
client.on('message', message => {
    if (message.author.bot) return; // If message was sent by a got ignore
    if (message.content.startsWith(prefix)){ // If the message was sent with the prefix
        const [cmd, ...args] = message.content
            .trim()
            .substring(prefix.length)
            .split(/\s+/);
        if(cmd === "ping"){
            message.channel.send("pong");
        } else if(cmd === "reactMsg" && message.author.id === "277186846117724160"){
            message.delete();

            const embed = new MessageEmbed()
                .setTitle("Reaction roles")
                .setColor(0xff0000)
                .setDescription("<:YouTube:709605862985039872> : I am a YouTuber\n<:twitch_streamer:709581340382724246> : I am a Twitch Streamer\n:page_facing_up: : Notify me about: **Miscellaneous (including twitch channel updates, etc)**\n:circus_tent: : Notify me about: **Events (including stream events)**\n:camera_with_flash: : Notify me about: **YouTube Videos**")
                .setFooter(`${client.user.username}`, "https://i.imgur.com/k6EqY8f.png");
            message.channel.send(embed);
        } else if(true) {

        }
    } else if(message.channel.id === "715689948711223366"){
        message.react("⬆️");
        message.react("⬇️");
    }

});

client.on("messageReactionAdd", (reaction, user) => {
    const { name } = reaction.emoji;
    const member = reaction.message.guild.members.cache.get(user.id);
    if (reaction.message.id === roleReactMsg){
        switch (name) {
            case "YouTube":
                member.roles.add("709529044072267906");
                break;
            case "twitch_streamer":
                member.roles.add("709528954305904650");
                break;
            case "📄":
                member.roles.add("732529645206896680");
                break;
            case "🎪":
                member.roles.add("732529543646019675");
                break;
            case "📸":
                member.roles.add("709887160936824852");
                break;
        }
    } else if(reaction.message.channel.id === "715689948711223366"){
        if(name === "⬆️" || name === "⬇️"){
            const totalReaction = reaction.message.reactions.resolve("⬆️").count + reaction.message.reactions.resolve("⬆⬇️").count
            if(totalReaction > 7 && reaction.message.reactions.resolve("⬆️").count / totalReaction > 0.8){
                member.roles.add("827443852192907264", "posted a good meme");
                client.channels.get("709607662806892594").send(reaction.message.author.username + " just became a meme god. GG!")
            }
        }
    }
}); 

client.on("messageReactionRemove", (reaction, user) => {
    const { name } = reaction.emoji;
    const member = reaction.message.guild.members.cache.get(user.id);
    if (reaction.message.id === roleReactMsg){
        switch (name) {
            case "YouTube":
                member.roles.remove("709529044072267906");
                break;
            case "twitch_streamer":
                member.roles.remove("709528954305904650");
                break;
            case "📄":
                member.roles.remove("732529645206896680");
                break;
            case "🎪":
                member.roles.remove("732529543646019675");
                break;
            case "📸":
                member.roles.remove("709887160936824852");
                break;
        }
    }
}); 

// Run bot
client.login(process.env.DISCORDJS_BOT_TOKEN);
