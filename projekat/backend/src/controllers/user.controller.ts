import express from 'express'
import UserModel from '../models/user'
import AgencyModel from '../models/agency'
import AdminModel from '../models/admin'


export class UserController{

    // Login for both User and Agency
    login = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let password = req.body.password;
        UserModel.findOne({'username': username, 'password': password}, (err, user)=>{
            if(err) console.log(err);
            else {
                if(user) {
                    res.json({
                        "user": user,
                        "type": "user"
                    })
                }
                else {
                    AgencyModel.findOne({'username': username, 'password': password}, (err1, agency)=>{
                        if(err1) console.log(err1);
                        else {
                            if(agency) {
                                res.json({
                                    "agency": agency,
                                    "type": "agency"
                                })
                            }
                            else {
                                AdminModel.findOne({'username': username, 'password': password}, (err2, admin)=>{
                                    if(err2) console.log(err2);
                                    else {
                                        if(admin) {
                                            res.json({
                                                "admin": admin,
                                                "type": "admin"
                                            })
                                        }
                                        else {
                                            res.json({
                                                "type": "error"
                                            })
                                        }
                                    }
                                })
                            }
                        }
                    })
                }
            }
        })
    }

    register = (req: express.Request, res: express.Response) => {
        let name = req.body.name
        let surname = req.body.surname
        let tel = req.body.tel
        let email = req.body.email
        let image = req.body.image
        let username = req.body.username
        let password = req.body.password

        UserModel.insertMany([{
            name: name,
            surname: surname,
            tel: tel,
            email: email,
            image: image,
            username: username,
            password: password
        }])

        res.json({'msg': 'OK'})
    }

    checkIsUsernameUnique = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        UserModel.findOne({'username': username}, (err, user)=>{
            console.log(user)
            if(err) console.log(err)
            else {
                if(user) {
                    res.json({'msg': 'false'})
                }
                else {
                    res.json({'msg': 'true'})
                }
            }
        })
    }

    checkIsEmailUnique = (req: express.Request, res: express.Response) => {
        let email = req.body.email;
        UserModel.findOne({'email': email}, (err, user)=>{
            console.log(user)
            if(err) console.log(err)
            else {
                if(user) {
                    res.json({'msg': 'false'})
                }
                else {
                    res.json({'msg': 'true'})
                }
            }
        })
    }

    get = (req: express.Request, res: express.Response) => {
        // throw new Error('Method not implemented.')
        console.log('get')
        res.json({'msg': 'ok'})
    }

    modifyUserField = (req: express.Request, res: express.Response) => {
        let field = req.body.field
        let value = req.body.value
        let username = req.body.username

        UserModel.findOne({'username': username}, (err, user)=>{
            console.log(user)
            if(err) console.log(err)
            else {
                if(user) {
                    UserModel.updateOne(
                        { 'username': username },
                        { $set : { [ field ] : value } },
                        (err, resp) => {
                            if(err) console.log(err)
                            else {
                                res.json({'msg': 'ok'})
                            }
                        }
                    )
                }
                else {
                    res.json({'msg': 'notFound'})
                }
            }
        })
    }

    deleteUser = (req: express.Request, res: express.Response) => {
        let username = req.body.username
        UserModel.deleteOne({ 'username': username }, (err, result) => {
            if (err) console.error(err);
        
            if (result.deletedCount === 0) {
              return res.status(404).json({ 'msg': 'notFound' });
            }
        
            res.json({ 'msg': 'ok' });
        })
    }

}