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
exports.Call = void 0;
const index_1 = require("./../db/index");
class Call {
    joinCall(callId) {
        return __awaiter(this, void 0, void 0, function* () {
            /* Check call already exists - Start*/
            let call = yield index_1.CallModal.findOne({ callId: callId });
            /* Check call already exists - End*/
            if (!call) {
                const newCall = new index_1.CallModal({
                    callId: callId,
                    offer: '',
                    answer: ''
                });
                newCall.save();
            }
            return call;
        });
    }
    saveOffer(offer, callId) {
        return __awaiter(this, void 0, void 0, function* () {
            let checkOfferExists = yield index_1.CallModal.findOne({ callId: callId });
            if (checkOfferExists && (checkOfferExists === null || checkOfferExists === void 0 ? void 0 : checkOfferExists.offer) == '') {
                let call = yield index_1.CallModal.findOneAndUpdate({ callId: callId }, { $set: { offer: offer } }, { new: true });
                return call;
            }
            return false;
        });
    }
    saveAnswer(answer, callId) {
        return __awaiter(this, void 0, void 0, function* () {
            let call = yield index_1.CallModal.findOneAndUpdate({ callId: callId }, { $set: { answer: answer } }, { new: true });
            return call === null || call === void 0 ? void 0 : call._id;
        });
    }
    getCallByRoomId(roomId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield index_1.CallModal.findOne({ callId: roomId });
        });
    }
}
exports.Call = Call;
