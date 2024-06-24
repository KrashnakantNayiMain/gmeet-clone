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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Candidate = void 0;
const index_1 = require("./../db/index");
const Call_1 = require("./Call");
class Candidate {
    constructor() {
        this.callManager = new Call_1.Call();
    }
    addCandidate(roomId, candidate) {
        return __awaiter(this, void 0, void 0, function* () {
            let call = yield this.callManager.joinCall(roomId);
            if (call) {
                const newCandidate = new index_1.CandidateModal({
                    callId: call === null || call === void 0 ? void 0 : call._id,
                    socketId: candidate.id
                });
                yield newCandidate.save();
            }
        });
    }
    setOffer(offer, roomId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.callManager.saveOffer(offer, roomId);
        });
    }
    getOtherCandidates(socket, roomId) {
        return __awaiter(this, void 0, void 0, function* () {
            let call = yield this.callManager.getCallByRoomId(roomId);
            return yield index_1.CandidateModal.find({ socketId: { $ne: socket.id }, callId: call === null || call === void 0 ? void 0 : call._id });
        });
    }
    setAnswer(offer, roomId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.callManager.saveAnswer(offer, roomId);
        });
    }
}
exports.Candidate = Candidate;
