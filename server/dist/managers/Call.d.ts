export declare class Call {
    joinCall(callId: string): Promise<(import("mongoose").Document<unknown, {}, {
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
    saveOffer(offer: string, callId: string): Promise<false | (import("mongoose").Document<unknown, {}, {
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
    saveAnswer(answer: string, callId: string): Promise<import("mongoose").Types.ObjectId | undefined>;
    getCallByRoomId(roomId: string): Promise<(import("mongoose").Document<unknown, {}, {
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
}
