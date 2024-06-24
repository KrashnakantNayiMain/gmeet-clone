import mongoose from "mongoose";

const candidatesSchema = new mongoose.Schema({
    candidate: {type: String},
    sdpMLineIndex: {type: String},
    sdpMid: {type: String},
    usernameFragment: {type: String},
    callId: { type: String},
    socketId : {type: String}
});

const callsSchema = new mongoose.Schema({
    callId: {type: String}, 
    offer: {type: String},
    answer: {type: String}
});
  
export const CandidateModal = mongoose.model('Candidate', candidatesSchema);
export const CallModal = mongoose.model('Call', callsSchema);