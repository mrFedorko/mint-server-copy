import async_hooks from 'node:async_hooks';
import fs from 'fs'
import express from 'express';
import config from 'config';
import mongoose from 'mongoose';

import cors from 'cors';

import connectDb from './sshTunel.js';
import { registerRouter } from './routes/register.route.js';
import { authRouter } from './routes/auth.route.js';
import { settingsRouter } from './routes/settings.route.js';
import { verifyJWT } from './middleware/verifyJWT.js';
import cookieParser from 'cookie-parser';
import { refreshTokenRouter } from './routes/refresh.route.js';
import { logoutRouter } from './routes/logout.route.js';
import { corsOptions } from '../config/corsOptions.js';
import { credentials } from './middleware/credentials.js';
import { newOrderRouter } from './routes/order.route.js';
import https from 'https'
import { notesRouter } from './routes/note.route.js';
import { Server } from 'socket.io';


import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const privateKey  = fs.readFileSync(__dirname + '/ssl/server.key', 'utf8');
const certificate = fs.readFileSync(__dirname + '/ssl/server.crt', 'utf8');
const app = express();


const PORT = config.get('port') || 8000;

app.use(credentials);
app.use(cors(corsOptions));

app.use(express.urlencoded({extended: false}));

app.use(express.json({extended: true}));

//middleware for cookies

app.use(cookieParser());


///////////////////ROUTES
app.use('/api/register', registerRouter);
app.use('/api/auth', authRouter);
app.use('/api/refresh', refreshTokenRouter)
app.use('/api/logout', logoutRouter);

///------protected routes
app.use(verifyJWT);

app.use('/api/settings/', settingsRouter);
app.use('/api/order/', newOrderRouter);
app.use('/api/notes/', notesRouter)


// create server for socket.io integretion
const sslCrt = {key: privateKey, cert: certificate}
const server = https.createServer(sslCrt, app);
const io = new Server(server)

io.on('connection', (socket) => {
    console.log(`socket: ${socket}`)
    console.log('a user connected')
} )
//////////////////SATRTING APP
const mongoConnection  = async () => {
    await mongoose.connect(config.get('mongoUri'));
    // console.log(async_hooks.executionAsyncId());

    process.on('unhandledRejection', error => {
        console.log('unhandledRejection', error.message);
    });

   
    server.listen(PORT, () => {
        console.log('App has been started on port ' + PORT);
    });
  
}
connectDb(mongoConnection);