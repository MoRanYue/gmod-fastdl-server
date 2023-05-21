# Gmod Fastdl Server

It is a Node.js server for _Garry's Mod_ server, for clients download custom mods faster.

# Instruction

1. Install _Node.js_.
1. Clone this repo.
1. Configure ".env" file, set "FILE_PATH" to your custom mods folder.
1. Compile those Typescript files. first, type `npm install`, then type `npm run build`
3. Start the server, just type `node ./dist/index.js`.
4. Add follow content to your game server configuration file such as "server.cfg".
5. Start your game server and test it.

```
net_maxfilesize 64
sv_allowupload 1
sv_allowdownload 1
sv_downloadurl "http://YOUR.HTTP.SERVER"
```
