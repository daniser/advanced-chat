import { Model } from "pinia-orm";
import { Uid, Attr, Num, Str, BelongsTo, BelongsToMany, HasMany, HasManyBy } from "pinia-orm/decorators";
import User from "./User";
import UserStatus from "./UserStatus";
import Message from "./Message";
import { useRoomChannel } from "@/composables";
import type { LastMessage, StringNumber } from "vue-advanced-chat";
import type { Room as BaseRoom } from "@/types";

export default class Room extends Model implements BaseRoom {
    static entity = "rooms";

    static primaryKey = "roomId";

    @Uid(7) roomId!: string;
    @Attr() creatorId!: string;
    @Str("") roomName!: string;
    @Str("") avatar!: string;
    @Num(null) unreadCount?: number;
    @Attr(null) index?: StringNumber | Date;
    @Attr(null) lastMessage?: LastMessage;
    //@Attr(null) typingUsers?: string[];
    @Attr([]) tags!: string[];
    status!: UserStatus;

    @BelongsTo(() => User, "creatorId") creator!: User;
    @BelongsToMany(() => User, { as: "status", model: () => UserStatus }, "roomId", "userId") users!: User[];
    //@HasManyBy(() => User, "typingUsers") usersTyping: User[];
    @HasMany(() => Message, "roomId") messages!: Message[];

    static created(room: Room, record?: { users?: string[] }) {
        console.log("created", room);

        //if (window.chat.permissions.viewForeignRooms) {
        if (record?.users?.includes(window.chat.userId)) {
            useRoomChannel().join(room);
        }
    }

    static deleted(room: Room) {
        console.log("deleted", room);

        useRoomChannel().leave(room);
    }
}
