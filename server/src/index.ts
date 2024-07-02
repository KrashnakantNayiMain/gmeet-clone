import express from 'express';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import mongoose from 'mongoose';
import { Candidate } from './managers/Candidate';

const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

const candidate = new Candidate();

io.on('connection', (socket: Socket) => {
  console.log('a user connected: ' + socket.id);

  socket.on("get-offer-and-save-in-current-socket", async ({ roomId }) => {
    let candidateCall = await candidate.getCandidateCall(socket, roomId);
    if(candidateCall?.offer?.type == 'offer') {
      socket.emit('set-offer-and-send-answer', { 
        currentCandidate : socket.id,
        description : candidateCall?.offer
      })
    } else {
      console.log('Offer not found for roomId : '+ roomId);
    }
  });

  socket.on("save-offer", async ({ description, roomId }) => {
    await candidate.addCandidate(roomId, socket);
    await candidate.setOffer(description, roomId);
    let otherCandidates = await candidate.getOtherCandidates(socket, roomId);
    otherCandidates.forEach((otherCandidate) => {
      if(otherCandidate.socketId && otherCandidate.socketId != socket.id) {
        io.to(otherCandidate.socketId).emit('set-offer-and-send-answer', { 
          currentCandidate : socket.id,
          description
        });
      }
    });
  });

  socket.on("send-answer", async ({ description, roomId }) => {
    await candidate.addCandidate(roomId, socket);
    await candidate.setAnswer(description, roomId);
    let otherCandidates = await candidate.getOtherCandidates(socket, roomId);
    otherCandidates.forEach((otherCandidate) => {
      if(otherCandidate.socketId && otherCandidate.socketId != socket.id) {
        io.to(otherCandidate.socketId).emit('get-answer-and-save-remote', { 
          currentCandidate : socket.id,
          description
        });
      }
    });
  });

  socket.on("iceCandidate", async ({addCandidate, roomId}) => {
    let otherCandidates = await candidate.getOtherCandidates(socket, roomId);
    otherCandidates.forEach((otherCandidate) => {
      if (otherCandidate.socketId && otherCandidate.socketId !== socket.id) {
        io.to(otherCandidate.socketId).emit("iceCandidateReply", {
          currentCandidate : socket.id,
          candidate : addCandidate 
        });
      }
    });
  });

  socket.on('disconnect', async () => {
    await candidate.removeCandidate(socket);
 });

});

// Error handling for the socket connection
io.on('error', (error) => {
  console.error('Socket.io error:', error);
});

mongoose.connect('mongodb+srv://krashnakantnayi:NMX57OwrcGlkv3l3@gmeet-cluster.xb9yfnj.mongodb.net/?appName=Gmeet-cluster', { dbName: "gmeet-clone" })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Error handling for the server
server.on('error', (error) => {
  console.error('Server error:', error);
});

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});
