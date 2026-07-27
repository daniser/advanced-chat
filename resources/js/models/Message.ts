import { Model } from "pinia-orm";
import { Uid, Attr, Str, Bool, BelongsTo, HasMany } from "pinia-orm/decorators";
import Room from "./Room";
import User from "./User";
import MessageFile from "./MessageFile";
import type { StringNumber, Message as BaseMessage, MessageReactions } from "vue-advanced-chat";

export default class Message extends Model implements BaseMessage {
    static entity = "messages";

    static primaryKey = "_id";

    @Uid(7) _id!: string;
    @Attr()  roomId!: string;
    @Str(window.chat.userId) senderId!: string;
    @Str(null) replyMessageId?: string;
    @Attr(null) indexId?: StringNumber;
    @Str(null) content?: string;
    @Str(null) username?: string;
    @Str(null) avatar?: string;
    @Str(null) date?: string;
    @Str(null) timestamp?: string;
    @Bool(null) system?: boolean;
    @Bool(null) saved?: boolean;
    @Bool(null) distributed?: boolean;
    @Bool(null) seen?: boolean;
    @Bool(null) deleted?: boolean;
    @Bool(null) edited?: boolean;
    @Bool(null) failure?: boolean;
    @Bool(null) disableActions?: boolean;
    @Bool(null) disableReactions?: boolean;
    @Attr({}) reactions!: MessageReactions;

    @BelongsTo(() => Room, "roomId") room!: Room;
    @BelongsTo(() => User, "senderId") sender!: User;
    @HasMany(() => MessageFile, "messageId") files?: MessageFile[];
    @BelongsTo(() => Message, "replyMessageId") replyMessage?: Message;
    @HasMany(() => Message, "replyMessageId") replies!: Message[];

    get id() {
        return this.indexId ?? this._id;
    }
}
