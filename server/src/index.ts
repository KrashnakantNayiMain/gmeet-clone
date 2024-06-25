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

interface CallInt {
  roomId : string
}
const candidate = new Candidate();

io.on('connection', (socket: Socket) => {
  console.log('a user connected: ' + socket.id);
  socket.on('disconnect', () => {
    
  });

  socket.on('join-call', (call: CallInt) => {
    candidate.addCandidate(call.roomId, socket);
  });

  socket.on("get-offer-and-save-in-current-socket", async ({ roomId }) => {
    let candidateCall = await candidate.getCandidateCall(socket, roomId);
    if(candidateCall?.offer != null) {
      socket.emit('set-offer-and-send-answer', { 
        currentCandidate : socket.id,
        description : JSON.parse(candidateCall?.offer)
      })
    } else {
      console.log('Offer not found for roomId : '+ roomId);
    }
  });

  socket.on("save-offer", async ({ description, roomId }) => {
    await candidate.setOffer(JSON.stringify(description), roomId);
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
    await candidate.setAnswer(JSON.stringify(description), roomId);
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

mongoose.connect('mongodb://localhost:27017/node-gmeet-clone', { dbName: "gmeet-clone" })
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
