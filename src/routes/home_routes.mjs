import app from 'express'

import HomeController from '../controllers/home_controller.mjs'

const routes = app.Router()

routes.get('/', new HomeController().get)

export default routes
