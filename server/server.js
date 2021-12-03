const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');

const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');
const db = require('./config/connection');

// const { createServer } = require('http');
// const { Server } = require("socket.io");
// const io = new Server(httpServer);

// let onlineUsers =[]
// const addNewSocketUser = (username, soketId) => {
//   !onlineUsers.some(userS=>userS.username === username) && onlineUsers.push({ username, socketId });
// };
// const deleteSoketUser = (socketId) => {
//   onlineUsers = onlineUsers.filter(userS => userS.socketId !== socketId );
// };
// const getOneSocketUser = (username) => {
//   return onlineUsers.find(userS=>userS.username === username);
// };
// io.on("connection", (socket) => {
//     socket.on("newSocketUser", (username) => {
//       addNewSocketUser(username, socket.id);
//     });
//     socket.on("disconnect",() => {
//       deleteSoketUser(socket.id);
//     });
  // [
  //   // {
  //   //   userId:1,
  //   //   socketId:"user1"
  //   // },
  //   {
  //     username:"Monika",
  //     socketId:"socketidhere"
  //   }
  // ]

  // console.log("someone has connected-socket.io");
  // io.emit("firstEvent", "sending a socket message during my first event")
  // socket.on("disconnect", ()=> {
  //   console.log("someone has left")
  // })
// });
// io.listen(3000);

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

server.applyMiddleware({ app });

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Serve up static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/public/index.html'));
});

// httpServer.listen(PORT, function() {
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
});