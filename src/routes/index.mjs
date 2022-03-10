import app from 'express'

import Home from './home_routes.mjs'
import Character from './character_routes.mjs'

const routes = app.Router()

routes.use('/', Home)
routes.use('/characters', Character)

export default routes
