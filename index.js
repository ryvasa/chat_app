import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import http from 'http';
import { Server } from 'socket.io';
import cookieParser from 'cookie-parser';
import { PrismaClient } from '@prisma/client';
import userRoute from './routes/userRoute.js';
import chatRoute from './routes/chatRoute.js';
import contactRoute from './routes/contactRoute.js';
import messageRoute from './routes/messageRoute.js';
import authRoute from './routes/authRoute.js';
import otpRoute from './routes/otpRoute.js';
import tokenRoute from './routes/tokenRoute.js';

dotenv.config();
const prisma = new PrismaClient();
const port = process.env.PORT;
const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ['http://localhost:5173', 'http://localhost:3000'],
    methods: ['GET', 'POST'],
  },
});
let users = [];
const addUser = (userId, socketId) => {
  if (!users.some((user) => user.userId === userId)) {
    users.push({ userId, socketId });
  }
};

const removeUser = (socketId) => {
  const filter = users.filter((user) => user.socketId === socketId);
  users = users.filter((user) => user.socketId !== socketId);
  const timestamp = Date.now();
  const date = new Date(timestamp);
  const online = date.toISOString();
  if (filter.length !== 0) {
    prisma.user.update({
      data: { last_online: online },
      where: { uuid: filter[0].userId },
    });
  }
};

io.on('connection', (socket) => {
  console.log(`User connected : ${socket.id}`);
  socket.on('join_room', (data) => {
    socket.join(data.id);
    addUser(data.user, socket.id);
    console.log(`User with ID : ${socket.id} joinedroom ${data.id}`);
  });

  socket.on('send_message', (data) => {
    socket.to(data.room).emit('receive_message', data);
  });

  socket.on('disconnect', () => {
    console.log('User diconnected', socket.id);
    removeUser(socket.id);
  });
});

app.use(
  cors({
    credentials: true,
    origin: ['*', 'http://localhost:3000', 'http://localhost:5173'],
  }),
);
app.use(express.json());
app.use(cookieParser());
app.use(userRoute);
app.use(chatRoute);
app.use(contactRoute);
app.use(messageRoute);
app.use(authRoute);
app.use(otpRoute);
app.use(tokenRoute);

server.listen(port);
