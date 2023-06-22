// Class that represents Agnecy in frontend
import {Comment} from "./comment"

export class Agency {
    agencyName: string
    state: string
    city: string
    adress: string
    pib: number
    description: string
    username: string
    password: string
    tel: string
    email: string
    image: Buffer

    comments: Array<Comment>
}