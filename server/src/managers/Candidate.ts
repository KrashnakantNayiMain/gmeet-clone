import { Socket } from 'socket.io';
import { CandidateModal } from './../db/index';
import { Call } from './Call';

export class Candidate {
    protected callManager: Call;
    constructor() {
        this.callManager = new Call();
    }

    async addCandidate(roomId: string, candidate: Socket) {
        let call = await this.callManager.joinCall(roomId);
        if(call) {
            const newCandidate = new CandidateModal({
                callId: call?._id,
                socketId: candidate.id
            });
            await newCandidate.save();
        }
    }

    async setOffer(offer: string, roomId: string) {
        return this.callManager.saveOffer(offer, roomId);
    }

    async getOtherCandidates(socket: Socket, roomId: string) {
        let call= await this.callManager.getCallByRoomId(roomId);
        return await CandidateModal.find({ socketId: { $ne: socket.id}, callId : call?._id});
    }

    async setAnswer(offer: string, roomId: string) {
        return this.callManager.saveAnswer(offer, roomId);
    }

    async removeCandidate(socket: Socket){
        return await CandidateModal.findOneAndDelete({socketId : socket.id});
    }

    async getCandidateCall(socket: Socket, roomId: string) {
        let call= await this.callManager.getCallByRoomId(roomId);
        return call;
    }
}