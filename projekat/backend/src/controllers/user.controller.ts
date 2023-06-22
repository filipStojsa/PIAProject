import express from 'express'
import UserModel from '../models/user'

export class UserController{
    login = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let password = req.body.password;

        UserModel.findOne({'username': username, 'password': password}, (err, user)=>{
            if(err) console.log(err);
            else {
                if(user) {
                    res.json(user)
                }
                else {
                    console.log('user is null')
                }
            }
        })
    }

    test = (req: express.Request, res: express.Response) => {
        UserModel.findOne({'username': 'pera'}, (err, user)=>{
            if(err) console.log(err)
            else {
                res.json(user)
            }
        })
    }

}