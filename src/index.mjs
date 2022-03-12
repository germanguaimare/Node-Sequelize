import express from 'express'
import './config/environment.mjs'
import routes from './routes/index.mjs'
import './models/index.mjs'
import swaggerui from "swagger-ui-express"
import swaggerjsdoc from "swagger-jsdoc"

const app = express()
const port = process.env.PORT || 5000

app.use(express.json())
app.use('/', routes)

const startServer = () => {
  app.listen(port, () => {
    console.log(`API running on http://127.0.0.1:${port}/`)
  })

}

startServer()

export default app

//DOCUMENTATION BELOW

const options = {
  definition: {
    infor: {
      title: "pinflag_challlenge",
      version: "1.0.0",
      description: "Swagger docs for the Pinflag Challenge"
    }
  },
  apis: ["index.mjs"]
}

const swaggerSpec = swaggerjsdoc(options)

app.use("/api/docs", swaggerui.serve, swaggerui.setup(swaggerSpec))

/**
 * @swagger
 * /characters/{N}:
 *  get:
 *    description: Get N characters from R&M API
 *    responses:
 *      "200":
 *        description: You get N characters from R&M API
 *      "400":
 *        description: N must be a number
 *    parameters:
 *      - in: path
 *        name: N
 *        description: Number of characters to get from R&M
 *        required: true
 *        schema:
 *          type: integer
 *          minimum: 1
 * /characters/:
 *  post:
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: body
 *        name: newChar
 *        description: new character info
 *        schema:
 *          type: object
 *          required:
 *            -name
 *            -species
 *            -status
 *            -origin
 *          properties:
 *            name:
 *              type: string
 *            species:
 *              type: string
 *            status:
 *              type: string
 *            origin:
 *              type: string
 *    description: Creates and stores a new Character in the db
 *    responses:
 *      "200":
 *        description: New character created and stored in the db
 *      "400":
 *        description: New character already exists or info is missing
 * /characters/find/{name}:
 *  get:
 *    description: Find character in database or R&M API
 *    responses:
 *      "200":
 *       description: You get character "name" info
 *      "400":
 *        description: Character is not in database nor R&M API
 *    parameters:
 *      - in: path
 *        name: name
 *        description: Character name to search
 *        required: true
 *        schema:
 *          type: string
 *      
 * 
 * 
 */

