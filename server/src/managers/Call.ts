import { CallModal } from './../db/index';

export class Call {
    async joinCall(callId: string) {
        /* Check call already exists - Start*/
        let call = await CallModal.findOne({callId : callId});
        /* Check call already exists - End*/
        if(!call) {
            const newCall = new CallModal({
                callId : callId,
                offer: '',
                answer: ''
            });
            newCall.save();
        }
        return call;
    }

    async saveOffer(offer: string, callId: string) {
        let call = await CallModal.findOneAndUpdate({callId : callId},
            {$set: {offer : offer}},
            { new: true }
        );
        return call;
    }

    async saveAnswer(answer: string, callId: string) {
        let call = await CallModal.findOneAndUpdate({callId : callId},
            {$set: {answer : answer}},
            { new: true }
        );
        return call?._id;
    }

    async getCallByRoomId(roomId: string) {
        return await CallModal.findOne({callId : roomId})
    }
}