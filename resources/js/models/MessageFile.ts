import { Model } from "pinia-orm";
import { Attr, Str, Num, Bool, BelongsTo } from "pinia-orm/decorators";
import Message from "./Message";
import type { MessageFile as BaseMessageFile } from "vue-advanced-chat";

export default class MessageFile extends Model implements BaseMessageFile {
    static entity = "messageFiles";

    static primaryKey = ["messageId", "name"];

    @Str("") messageId!: string;
    @Str("") name!: string;
    @Str("") type!: string;
    @Str("") extension!: string;
    @Str("") url!: string;
    @Str(null) localUrl?: string;
    @Str(null) preview?: string;
    @Num(null) size?: number;
    @Bool(null) audio?: boolean;
    @Num(null) duration?: number;
    @Num(null) progress?: number;
    @Attr() blob?: Blob;

    @BelongsTo(() => Message, "messageId") message!: Message;
}
