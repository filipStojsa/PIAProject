// Class that represents Object in frontend
import {Room} from "./rooms"

export class Object {
    type: string
    address: string
    num: number
    area: number
    user: string
    status: string
    rooms: Array<Room>
}