import mongoose from "mongoose";

const candidatesSchema = new mongoose.Schema({
    candidate: {type: String},
    sdpMLineIndex: {type: String},
    sdpMid: {type: String},
    usernameFragment: {type: String},
    callId: { type: String},
    socketId : {type: String, unique : true}
});

const callsSchema = new mongoose.Schema({
    callId: {type: String, unique : true}, 
    offer: {type: mongoose.Schema.Types.Mixed, default: {}},
    answer: {type: mongoose.Schema.Types.Mixed, default: {}}
});
  
export const CandidateModal = mongoose.model('Candidate', candidatesSchema);
export const CallModal = mongoose.model('Call', callsSchema);