# Gmod Fastdl Server

It is a Node.js server for _Garry's Mod_ server, for clients download custom mods faster.

# Instruction

1. Install _Node.js_.
1. Clone this repo.
1. Configure ".env" file, set "FILE_PATH" to your custom mods folder.
1. If you have not prepared the Lua script file yet, set "GENERATE_SCRIPT" to "1".
1. Type "npm install", then "npm run build" (When you change some configurations, then you need to put ".env" file to "dist" folder and cover the origin file.)
1. When you want to start the server, or generate a script file, just type `node dist`.
1. If it generated a file and it named "fastdl.lua", move the file to "YOUR_GMOD_SERVER/garrysmod/lua/autorun".
1. Add follow content to your game server configuration file such as "server.cfg".
1. Start your game server and test it.

```cfg
net_maxfilesize 64
sv_allowupload 1
sv_allowdownload 1
sv_downloadurl "http://YOUR.HTTP.SERVER"
```
