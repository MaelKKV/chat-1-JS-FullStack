const http = require ('http');
const path = require ('path');
const express = require ('express');
const socketio = require ('socket.io');

const mongoose = require ('mongoose');

const app = express();
const server = http.createServer(app);
const io = socketio.listen(server);

//DB Do not Change.
const dbpath = "mongodb://localhost:27018/batch2";

const mongo = mongoose.connect(dbpath, {useNewUrlParser: true });
mongo.then(() => {
console.log('db is connected');
}).catch((err) => {
console.log('err in db connection', err);
});


//Settings
app.set('port', process.env.PORT || 3000);

require('./sockets')(io);

//Static Files
app.use(express.static(path.join(__dirname, 'public')));

//Server Listening
server.listen(app.get('port'), () => {
  console.log(`server on port ${app.get('port')}`);
});
