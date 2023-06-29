import express from 'express'
import ObjekatModel from '../models/object'
import { Request, Response } from 'express-serve-static-core'
import { ParsedQs } from 'qs'

export class ObjectController{
    get = (req: express.Request, res: express.Response) => {
        // throw new Error('Method not implemented.')
        console.log('get')
        res.json({'msg': 'ok'})
    }

    addObject = (req: express.Request, res: express.Response) => {
        // throw new Error('Method not implemented.')
        console.log('addObject called')

        let type = req.body.type
        let address = req.body.address
        let num = req.body.num
        let area = req.body.area
        let user = req.body.user
        let status = req.body.status
        let rooms = req.body.rooms
        console.log(rooms)

        ObjekatModel.insertMany([{
            type: type,
            address: address,
            num: num,
            area: area,
            user: user,
            status: status,
            rooms: rooms
        }])

        res.json({'msg': 'ok'})
    }
    

}