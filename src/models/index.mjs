
import { DataTypes, Op } from 'sequelize'
import sequelize from '../config/sequelize.mjs'
import Character from "./character_model.mjs"

const models = {}

models.Character = Character

//models.Character = require('./character_model').default(sequelize, DataTypes)

export { sequelize, Op }
export default models
