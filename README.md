# GenuineGenie Discord Bot Beta
A bot that can do everything?   
+ The purpose of this repo is to accept open source contributions for GenuineGenie Discord Bot revamping process. 
+ Once sufficient command revamp has been done, this repo will replace the original repo as the source code of bot. 

# 🖥️ Code Walkthrough 
+ [index.js](index.js) is the brain of the discord bot. This file helps us connect to discord API to send and receive messages. 
+ [schema.txt](schema.txt) contains the schema of collections in mongodb. This file is just for our reference to help us during CRUD operations. 
+ [database folder](database) 
  + [mongo.js](database/mongo.js) is used to connect to mongodb database. It gets the connection URI from `config.json` *(config.json was not pushed to the repo because it contains sensitive information like bot token)*
  + [database/schemas](database/schemas) files are used to get document values from mongodb collection. 
+ [config.json]() will contain

```js
{
  "token": "",   
  "mongoURL": "",   
  "dm_prefix": "dm"  
}
```

# 🤔 Where to add new commands?
+ New commands must be added to [commands folder](commands) under respective category as `.js` file.   
  For example, `daily` command is a `fun` category command. So it must be added inside [commands/fun/daily.js](commands/fun/daily.js) 
+ The final revamped version of beta bot will [look like this](https://github.com/ssncodingclub/discord-bot-GenuineGenie/tree/main/commands/commands) after adding all the commands under respective categories. 

# 💭 How is the respective command file called?
+ Each command is present inside the a subfolder of [commands folder](commands) folder. But how does index.js call respective command? 
  + The [original discord bot](https://github.com/ssncodingclub/discord-bot-GenuineGenie) contains a [loadcommand.js](https://github.com/ssncodingclub/discord-bot-GenuineGenie/blob/main/commands/load-commands.js) file inside the commands folder.
  + [loadcommand.js](https://github.com/ssncodingclub/discord-bot-GenuineGenie/blob/main/commands/load-commands.js) loads all the commands using their file names and path.
  + These are then called in index.js using [require](https://github.com/ssncodingclub/discord-bot-GenuineGenie/blob/main/index.js#:~:text=const%20loadCommands%20%3D%20require).

# ✔️ Tasks to do
+ Create `loadcommand.js` for this beta bot. 
+ Move commands from [original discord bot](https://github.com/ssncodingclub/discord-bot-GenuineGenie) to beta bot's command folder. 
