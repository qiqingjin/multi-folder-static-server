# multi-folder-static-server

Static files server which can host multiple folders

# Use

1. run `npm install`
2. run `node server folder1 folder2 ... -p port -s true/false -r root`
3. `-p` - port number (default 3000), `-s` - whether use `https` (default false), `-r` - url root path (default is null)
4. visit `[http|https]://localhost:[port]/root/[yourFileName]` to get your static files

# Example
```js
node server ./ ./node_modules -p 3002 -s true -r /src
// serve at ./ and ./node_modules, port 3002, use https
// file `./node_modules/a/index.js` can be got from url `https://locahost:3002/src/a/index.js`
```
