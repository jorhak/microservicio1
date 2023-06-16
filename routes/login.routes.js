import { Router } from 'express'
import fileUpload from 'express-fileupload'

import {login} from '../controllers/login_controller.js'

const router = Router()

router.post('/login', fileUpload({
    useTempFiles : true,
    tempFileDir : './uploads'
}),login)

export default router