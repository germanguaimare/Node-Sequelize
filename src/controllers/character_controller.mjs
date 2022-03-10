import models from '../models/index.mjs'
import BaseController from './base.mjs'
import axios from "axios"
import { Sequelize } from 'sequelize'

//Utility variables and functions

var characters = []
var page = 1

async function getCharacters(N) {

  while (page <= Math.ceil(N / 20)) {

    //Data Fetching
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
}
// End of utilities

//Endpoints functions
export default class CharacterController extends BaseController {
  CharacterController() { }

  async index(req, res) {

    await getCharacters(req.params.N) //Data Fetching
    const charsToReturn = characters.filter((character) => character.id <= req.params.N) //Getting just N characters
    
    //Reducing info to just name, status, species and origin
    const reducedChars = []
    charsToReturn.forEach((character) => reducedChars.push({ name: character.name, status: character.status, species: character.species, origin: character.origin.name }))

    return super.Success(res, reducedChars)

  }

  async create(req, res) {

    const connection = new Sequelize("pinflag_challenge", "postgres", "docker", { dialect: "postgres" })
    const Character = models.Character
   
    //Getting data sent to the endpoint
    const body = req.body
    const charName = body.name
    
    //Creating new Character model instance (new row on db)
    await connection.sync({ force: true }).then(() => {
      Character.create({
        name: body.name,
        status: body.status,
        species: body.species,
        origin: body.origin
      })
    })

    return super.Success(res, `You created ${charName} as a Character`)
  }

  async show(req, res) {
    //Getting data sent to the endpoint
    const body = req.body
    const Character = models.Character
    
    //Searching for the character in db
    const searched = await Character.findOne({ where: { name: body.name } })

    //If the character exists in db
    if (searched) { 
      return super.Success(res, searched.dataValues) 
    }

    //If the character doesn't exists in db
    else {
      await getCharacters(826) //Getting all characters from R&M API
      const charToReturn = await characters.find(character => character.name == body.name) // Looking for the name in all characters from R&M API
      
      //Setting up character response object
      const myChar = {
        name: charToReturn.name,
        status:charToReturn.status,
        species: charToReturn.species,
        origin: charToReturn.origin.name
      }

      return super.Success(res, myChar) 
      
    }
  }
}
