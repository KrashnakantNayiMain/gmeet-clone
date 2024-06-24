import { Socket } from 'socket.io';
import { Call } from './Call';
export declare class Candidate {
    protected callManager: Call;
    constructor();
    addCandidate(roomId: string, candidate: Socket): Promise<void>;
    setOffer(offer: string, roomId: string): Promise<false | (import("mongoose").Document<unknown, {}, {
        callId?: string | null | undefined;
        offer?: string | null | undefined;
        answer?: string | null | undefined;
    }> & {
        callId?: string | null | undefined;
        offer?: string | null | undefined;
        answer?: string | null | undefined;
    } & {
        _id: import("mongoose").Types.ObjectId;
    }) | null>;
    getOtherCandidates(socket: Socket, roomId: string): Promise<(import("mongoose").Document<unknown, {}, {
        candidate?: string | null | undefined;
        sdpMLineIndex?: string | null | undefined;
        sdpMid?: string | null | undefined;
        usernameFragment?: string | null | undefined;
        callId?: string | null | undefined;
        socketId?: string | null | undefined;
    }> & {
        candidate?: string | null | undefined;
        sdpMLineIndex?: string | null | undefined;
        sdpMid?: string | null | undefined;
        usernameFragment?: string | null | undefined;
        callId?: string | null | undefined;
        socketId?: string | null | undefined;
    } & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    setAnswer(offer: string, roomId: string): Promise<import("mongoose").Types.ObjectId | undefined>;
}
