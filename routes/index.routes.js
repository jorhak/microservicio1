import { Router } from 'express'

const router = Router()

router.get('/',(req, res) => res.send('Hello world'))

router.get('/ping',(req, res) => res.send('Pong'))

export default router