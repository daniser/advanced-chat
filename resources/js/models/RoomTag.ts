import { Model } from "pinia-orm";
import { Attr, Str } from "pinia-orm/decorators";
import type { RoomTag as BaseTag } from "@/types";

export default class RoomTag extends Model implements BaseTag {
    static entity = "roomTags";

    static primaryKey = ["name", "type"];

    @Attr() name!: string;
    @Str("") type!: string;
    @Str("") link!: string;
}
