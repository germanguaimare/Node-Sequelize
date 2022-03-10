import models from '../models/index.mjs'
import BaseController from './base.mjs'
import axios from "axios"
import { Sequelize } from 'sequelize'

export default class CharacterController extends BaseController {
  CharacterController() { }

  async index(req, res) {

    var characters = []
    var page = 1

    while (page <= Math.ceil(req.params.N / 20)) {

      var config = {
        method: 'get',
        url: `https://rickandmortyapi.com/api/character/?page=${page}`,
        headers: {}
      };

      await axios(config)
        .then(response => {
          characters = [...characters, ...response.data.results]
        })
        .catch(error => {
          console.log(error);
        });

      page++

    }

    const charsToReturn = characters.filter((character) => character.id <= req.params.N)
    const reducedChars = []
    charsToReturn.forEach((character) => reducedChars.push({ name: character.name, status: character.status, species: character.species, origin: character.origin.name }))

    return super.Success(res, reducedChars)

  }

  create(req, res) {

    const connection = new Sequelize("pinflag_challenge", "postgres", "docker", { dialect: "postgres" })
    const Character = models.Character
    const body = req.body
    console.log(body)
    connection.sync({ force: true }).then(() => {
      console.log(body)
      Character.create({
        name: body.name,
        status: body.status,
        species: body.species,
        origin: body.origin
      })
    })

    return super.Success(res, 'You tried to create the Character', body.name)
  }

  async show(req, res) {
    return super.Success(res, '')
  }
}
