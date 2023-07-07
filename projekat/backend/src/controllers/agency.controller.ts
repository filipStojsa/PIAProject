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
        let tel = req.body.tel
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
            status: 'pending',
            workers: '0',
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

    getAllAgencies = (req: express.Request, res: express.Response) => {
        AgencyModel.find({}, (err, agencies) => {
            if(err) console.log(err)
            else {
                if(agencies) {
                    console.log('Found some agencies...')
                    res.json(agencies)
                }
            }
        })
    }

    addComment = (req: express.Request, res: express.Response) => {
        let agencyUsername = req.body.agencyId
        let commentText = req.body.comment
        let user = req.body.user
        let username = req.body.username
        let rating = req.body.rating

        AgencyModel.findOne({ 'username' : agencyUsername }, (err, agency) => {
            if(err) console.log(err)
            else {
                if(agency) {
                    let comment = {
                        user: user,
                        rating: rating,
                        comment: commentText,
                        username: username
                    }

                    AgencyModel.updateOne(
                        { 'username' : agencyUsername },
                        { $push: { 'comments' : comment } },
                        (err, response) => {
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

    editComment = (req: express.Request, res: express.Response) => {
        let agencyUsername = req.body.agencyUsername
        let commentText = req.body.comment
        let rating = req.body.rating
        let commentIndex = req.body.index

        console.log('Comm - ' + commentText)
        console.log('Rating - ' + rating)

        AgencyModel.findOne({ 'username' : agencyUsername }, (err, agency) => {
            if(err) console.log(err)
            else {
                if(agency) {
                    AgencyModel.updateOne(
                        { 'username' : agencyUsername },
                        { $set: { 
                            [`comments.${commentIndex}.rating`]: rating,
                            [`comments.${commentIndex}.comment`]: commentText,
                         } },
                        (err, response) => {
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

    modifyAgencyField = (req: express.Request, res: express.Response) => {
        let field = req.body.field
        let value = req.body.value
        let username = req.body.username

        AgencyModel.findOne({'username': username}, (err, user)=>{
            console.log(user)
            if(err) console.log(err)
            else {
                if(user) {
                    AgencyModel.updateOne(
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

    deleteAgency = (req: express.Request, res: express.Response) => {
        let username = req.body.username
        AgencyModel.deleteOne({ 'username': username }, (err, result) => {
            if (err) console.error(err);
        
            if (result.deletedCount === 0) {
              return res.status(404).json({ 'msg': 'notFound' });
            }
        
            res.json({ 'msg': 'ok' });
        })
    }
}