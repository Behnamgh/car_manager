import { PartChange } from "./partChange.model";

export class Part {
    profilePic: string;
    name: string;
    about: string;
    list: PartChange[];
    notification: number;
}