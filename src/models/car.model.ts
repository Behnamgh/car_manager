import { Fuel } from './fuel.model'
import { Part } from './part.model';
export class Car {
    profilePic: string;
    name: string;
    about: string;
    fuels: Fuel[];
    parts: Part[];
    maxKm:number;
}
