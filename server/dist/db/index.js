"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CallModal = exports.CandidateModal = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const candidatesSchema = new mongoose_1.default.Schema({
    candidate: { type: String },
    sdpMLineIndex: { type: String },
    sdpMid: { type: String },
    usernameFragment: { type: String },
    callId: { type: String },
    socketId: { type: String }
});
const callsSchema = new mongoose_1.default.Schema({
    callId: { type: String },
    offer: { type: String },
    answer: { type: String }
});
exports.CandidateModal = mongoose_1.default.model('Candidate', candidatesSchema);
exports.CallModal = mongoose_1.default.model('Call', callsSchema);
