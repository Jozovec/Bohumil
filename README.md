# Bohumil
Bohumil is a Discord bot. A really shitty one.
## How to use?
Sorry bro but I'm really lazy so this guide will be even shittier than the bot (might update it in the future).
### Minecraft Server Setup
Lookup a tutorial how to enable RCON on your Minecraft server. You will need to remember the **Server IP**, **RCON Port** and the **RCON Password**.
### Discord Application Setup
Check out the Discord Dveloper Docs to learn how to make a **Discord Application** and a **Bot**.
The bot will need at least the **Read Messages** and **Send Messages** permission, however I recommend giving it **Administrator Privilages** as there might be some commands that require it. Don't worry, Bohumil is't harmful.
### Node JS Setup
Donwload Node JS and copy the files above to your working directory.
### Modify the code
Open the **index.js** and modify:
1. RCON settings (IP_ADDRESS, RCON_PORT, RCON_PASSWORD)
2. Channel ID of your Console Text Channel*
3. Uncomment and modify the WHITELISTED_CHANNEL_ID if you only want your bot to work in one channel
4. Replace DICORD_BOT_ID with the ID of your Discord Bot

* If you don't want any bot console, delete **all** the lines containing **botConsole** (*botConsole.send("hello world") etc.*).
* Also, to get your Server and Channel ID, lookup a guide to enable **Developer mode** and get the IDs
