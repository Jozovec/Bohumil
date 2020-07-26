// Initialize Discord's JS library
var Discord = require("discord.js");
var client = new Discord.Client();

// Initialize HTTP request library
var requestify = require("requestify");

// Initialize minecraft rcon
var Rcon = require("simple-rcon");
var rcon = new Rcon({
    host: "IP_ADDRESS",
    port: "RCON_PORT",
    password: "RCON_PASSWORD"
});

// Global variables
var botConsole;
var jokeData;
var enableTTS = false;

// On Bot's initialization
client.once("ready", () => {
    console.log("Logged as: " + client.user.username);
    botConsole = client.channels.cache.get("CONSOLE_CHANNEL_ID");
});

// On new message
client.on("message", message => {
    // If not command, return
    if (!message.content.startsWith("//") || message.author.bot) return;
    /*
    if (message.channel.id != "WHITELISTED_CHANNEL_ID") {
        message.channel.send("Bohumil\'s not enabled here...");
        return;
    }*/

    // Debug into console
    console.log(message.member.user.username + " typed " + message.content);
    botConsole.send("New message:\n" + message.member.user.username + " typed " + message.content);

    // Create argument array
    var messageArgs = message.content.split(" ");

    // Bot's TTS command
    if (message.content === "//tts") {
        enableTTS = !enableTTS;
        message.channel.send("Bohumil\'s TTS: " + enableTTS, { tts: enableTTS });
        return;
    }

    // Client info command
    if (message.content === "//me") {
        message.channel.send(message.author.username + "\'s Discord tag:\n    " + message.author.tag + "\n" + message.author.username + "\'s Discord id:\n    " + message.author.id, { tts: enableTTS });
        return;
    }

    // Thanks command
    if (message.content === "//thanks") {
        message.channel.send("np, I\'m here for you!");
        return;
    }

    // Minecraft server commands
    if (message.content.startsWith("//minecraft ")) {
        if (messageArgs[1] === "help") {
            message.channel.send("Server commads:\nplayers : Returns list of online players\nsay <text> : Prints text into server chat\nsayraw <text> : Prints unformatted text into server chat\nhelp : Shows this list");
            return;
        }
        try {
            var serverResponse = "";
            var validCommand = false;
            switch (messageArgs[1]) {
                case "players":
                    var text = message.content.substr(15);
                    rcon.connect();
                    rcon.exec("/list", function (res) {
                        serverResponse = res.body;
                        if (serverResponse.split(" of a max of ")[0].substr(10) === "0") {
                            message.channel.send("No players online");
                        } else {
                            message.channel.send("Players online: " + serverResponse.split(" of a max of ")[0].substr(10) + "\n" + serverResponse.split(" players online: ")[1]);
                        }
                    });

                    validCommand = true;
                    break;

                case "say":
                    var text = message.content.substr(15);
                    rcon.connect();
                    rcon.exec("/tellraw @a \"<<BotBohumil>> <" + message.author.username + "> " + text + "\"", function (res) {
                        serverResponse = res.body;
                        message.channel.send("Sent!");
                    });

                    validCommand = true;
                    break;

                case "sayraw":
                    var text = message.content.substr(18);
                    rcon.connect();
                    rcon.exec("/tellraw @a \"" + text + "\"", function (res) {
                        serverResponse = res.body;
                        message.channel.send("Sent!");
                    });

                    validCommand = true;
                    break;

                default:
                    message.channel.send("Invalid command!");
                    validCommand = false;
            }
            setTimeout(() => {
                if (validCommand) {
                    rcon.close();
                }
            }, 500);
        } catch{
            message.channel.send("Server is unavailable...");
        }
        return;
    }

    // Dad joke command
    if (message.content === "//dadjoke") {
        requestify.get("https://icanhazdadjoke.com", { headers: { Accept: "application/json" } }).then(function (response) {
            var jokeData = response.getBody();
            message.channel.send(jokeData.joke);
        });
        return;
    }

    // Corona stats command
    if (message.content === "//corona" || message.content === "//covid") {
        requestify.get("https://disease.sh/v3/covid-19/all", { headers: { Accept: "application/json" } }).then(function (response) {
            var coronaData = response.getBody();
            message.channel.send("Total cases:  " + coronaData.cases + "\nTotal deaths:  " + coronaData.deaths + "\nToday cases:  " + coronaData.todayCases + "\nToday deaths:  " + coronaData.todayDeaths + "\nRecovered:  " + coronaData.recovered);
        });
        return;
    }

    // Help command
    if (message.content === "//help") {
        message.channel.send("Commands available:\n//tts : Toggles Bohumil\'s TTS\n//me : Gives basic Discord info about sender\n//minecraft : Type \"//minecraft help\" for server commands\n//dadjoke : Gives a shitty dad joke\n//corona (or) //covid : Gives corona stats\n//help : Shows this list");
        return;
    }

    // If no command found
    message.channel.send("Unknown command...\nTry //help");
});

// Run bot
client.login("DISCORD_BOT_ID");
