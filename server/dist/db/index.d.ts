import mongoose from "mongoose";
export declare const CandidateModal: mongoose.Model<{
    candidate?: string | null | undefined;
    sdpMLineIndex?: string | null | undefined;
    sdpMid?: string | null | undefined;
    usernameFragment?: string | null | undefined;
    callId?: string | null | undefined;
    socketId?: string | null | undefined;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
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
    _id: mongoose.Types.ObjectId;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    candidate?: string | null | undefined;
    sdpMLineIndex?: string | null | undefined;
    sdpMid?: string | null | undefined;
    usernameFragment?: string | null | undefined;
    callId?: string | null | undefined;
    socketId?: string | null | undefined;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    candidate?: string | null | undefined;
    sdpMLineIndex?: string | null | undefined;
    sdpMid?: string | null | undefined;
    usernameFragment?: string | null | undefined;
    callId?: string | null | undefined;
    socketId?: string | null | undefined;
}>> & mongoose.FlatRecord<{
    candidate?: string | null | undefined;
    sdpMLineIndex?: string | null | undefined;
    sdpMid?: string | null | undefined;
    usernameFragment?: string | null | undefined;
    callId?: string | null | undefined;
    socketId?: string | null | undefined;
}> & {
    _id: mongoose.Types.ObjectId;
}>>;
export declare const CallModal: mongoose.Model<{
    callId?: string | null | undefined;
    offer?: string | null | undefined;
    answer?: string | null | undefined;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    callId?: string | null | undefined;
    offer?: string | null | undefined;
    answer?: string | null | undefined;
}> & {
    callId?: string | null | undefined;
    offer?: string | null | undefined;
    answer?: string | null | undefined;
} & {
    _id: mongoose.Types.ObjectId;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    callId?: string | null | undefined;
    offer?: string | null | undefined;
    answer?: string | null | undefined;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    callId?: string | null | undefined;
    offer?: string | null | undefined;
    answer?: string | null | undefined;
}>> & mongoose.FlatRecord<{
    callId?: string | null | undefined;
    offer?: string | null | undefined;
    answer?: string | null | undefined;
}> & {
    _id: mongoose.Types.ObjectId;
}>>;
