"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const mongoose_1 = __importDefault(require("mongoose"));
const Candidate_1 = require("./managers/Candidate");
const app = (0, express_1.default)();
const server = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*"
    }
});
const candidate = new Candidate_1.Candidate();
io.on('connection', (socket) => {
    console.log('a user connected: ' + socket.id);
    socket.on('disconnect', () => {
    });
    socket.on('join-call', (call) => {
        candidate.addCandidate(call.roomId, socket);
    });
    socket.on("send-offer", (_a) => __awaiter(void 0, [_a], void 0, function* ({ description, roomId }) {
        yield candidate.setOffer(JSON.stringify(description), roomId);
        let otherCandidates = yield candidate.getOtherCandidates(socket, roomId);
        otherCandidates.forEach((otherCandidate) => {
            if (otherCandidate.socketId && otherCandidate.socketId != socket.id) {
                io.to(otherCandidate.socketId).emit('accept-offer', {
                    currentCandidate: socket.id,
                    description
                });
            }
        });
    }));
});
// Error handling for the socket connection
io.on('error', (error) => {
    console.error('Socket.io error:', error);
});
mongoose_1.default.connect('mongodb://localhost:27017/node-gmeet-clone', { dbName: "gmeet-clone" })
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
