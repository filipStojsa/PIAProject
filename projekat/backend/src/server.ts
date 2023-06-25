import express from 'express';
import cors from 'cors'
import mongoose from 'mongoose'
import userRouter from './routers/user.routes';
import agencyRouter from './routers/agency.routes';

const app = express();
app.use(cors())
app.use(express.json())


mongoose.connect('mongodb://127.0.0.1:27017/jul23')
const connection = mongoose.connection
connection.once('open', ()=>{
    console.log('db connected')
})

const router = express.Router();
router.use('/user', userRouter)
router.use('/agency', agencyRouter)

app.use('/', router)
app.listen(4000, () => console.log(`Express server running on port 4000`));