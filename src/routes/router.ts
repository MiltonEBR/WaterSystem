import express from 'express'
import usgsRoutes from './daily.routes'

const router = express.Router()

router.use('/daily', usgsRoutes)

export default router