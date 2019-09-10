 const Koa = require('koa');
 const static_serve = require('koa-static');
 const bodyParser = require('koa-bodyparser');
 const http = require('http');
 const https = require('https');
 const path = require('path');
 const fs = require('fs');
 const parseArgs = require('minimist');
 const mount = require('koa-mount');
 const enforceHttps = require('koa-sslify');

const app = new Koa();
const argv = parseArgs(process.argv.slice(2));

const port = argv.p || '3000';
const folders = argv._ || [];
const isSSL = argv.s || false;
const root = argv.r || null;

//support cors
app.use(async (ctx, next) => {
	ctx.res.setHeader('Access-Control-Allow-Origin', '*');
	ctx.res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, HEAD, OPTIONS');
	ctx.res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
	await next();
})
.use(bodyParser());

folders.forEach((f) => {
	console.log('serve at - ', path.join(__dirname, f));
	if(!root){
		app.use(static_serve(path.join(__dirname, f), {maxage: 31557600000, gzip: false}));
	}else{
		console.log('-root', root);
		app.use(mount(root, static_serve(path.join(__dirname, f), {maxage: 31557600000, gzip: false})));
	}
});

app.on('error', (err, ctx) => {
  console.log('server error', err, ctx);
});

if(isSSL){
	app.use(enforceHttps());
	https.createServer({
		key: fs.readFileSync(__dirname + '/cert/server.key', 'utf8'),
		cert: fs.readFileSync(__dirname + '/cert/server.crt', 'utf8')
	}, app.callback()).listen(port);
}else{
	http.createServer(app.callback()).listen(port);
}
