import { CallModal } from './../db/index';

export class Call {
    async joinCall(callId: string) {
        try {
            /* Check call already exists - Start*/
            let call = await CallModal.findOne({ callId: callId });
            /* Check call already exists - End*/
    
            if (!call) {
                const newCall = new CallModal({
                    callId: callId
                });
                return await newCall.save();
            } else {
                return call;
            }
        } catch (error : any) {
            if (error.code === 11000) {
                // Duplicate key error
                return await CallModal.findOne({ callId: callId });
            } else {
                throw error;
            }
        }    
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