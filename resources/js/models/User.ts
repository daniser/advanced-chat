import { Model } from "pinia-orm";
import { Attr, Str, BelongsToMany, HasMany } from "pinia-orm/decorators";
import Room from "./Room";
import UserStatus from "./UserStatus";
import Message from "./Message";
import type { RoomUser as BaseUser } from "vue-advanced-chat";

export default class User extends Model implements BaseUser {
    static entity = "users";

    static primaryKey = "_id";

    @Attr() _id!: string;
    @Str("") username!: string;
    @Str("") credential!: string;
    @Str("") avatar!: string;
    status!: UserStatus;

    @BelongsToMany(() => Room, { as: "status", model: () => UserStatus }, "userId", "roomId") rooms!: Room[];
    @HasMany(() => Message, "senderId") messages!: Message[];
}
