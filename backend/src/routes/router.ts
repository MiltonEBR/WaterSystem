import express from 'express'
import usgsRoutes from './usgs.routes'

const router = express.Router()

router.use('/usgs', usgsRoutes)

export default router