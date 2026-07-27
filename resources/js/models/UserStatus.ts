import { Model } from "pinia-orm";
import { Attr, Str } from "pinia-orm/decorators";
import type { UserStatus as BaseUserStatus } from "vue-advanced-chat";

export default class UserStatus extends Model implements BaseUserStatus {
    static entity = "userStatus";

    static primaryKey = ["roomId", "userId"];

    @Attr() roomId!: string;
    @Attr() userId!: string;
    @Str("offline") state!: "online" | "offline";
    @Attr() lastChanged!: string;
}
