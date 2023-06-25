import express from 'express'
import AgencyModel from '../models/agency'

export class AgencyController{
    login = (req: express.Request, res: express.Response) => {
        // To be implemented...
        console.log('To be implemented...')
    }

    register = (req: express.Request, res: express.Response) => {
        let agencyName = req.body.agencyName
        let state = req.body.state
        let city = req.body.city
        let adress = req.body.adress
        let pib = req.body.pib
        let description = req.body.description
        let username = req.body.username
        let password = req.body.password
        let tel = req.body.password
        let email = req.body.email
        let image = req.body.image

        AgencyModel.insertMany([{
            agencyName: agencyName,
            state: state,
            city: city,
            adress: adress,
            pib: pib,
            description: description,
            username: username,
            password: password,
            tel: tel,
            email: email,
            image: image,
            comments: []
        }])

        res.json({'msg': 'OK'})
    }

    checkIsUsernameUnique = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        AgencyModel.findOne({'username': username}, (err, user)=>{
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
        console.log('To be implemented...')
    }

    checkIsEmailUnique = (req: express.Request, res: express.Response) => {
        // To be implemented...
        console.log('To be implemented - checkIsEmailUnique...')
    }

}