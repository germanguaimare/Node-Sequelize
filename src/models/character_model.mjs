import { Sequelize, DataTypes, Model } from 'sequelize'

/*export default (sequelize, DataTypes) => {
  return Character.init(sequelize, DataTypes)
}

class Character extends Sequelize.Model {
  static init (sequelize, DataTypes) {
    super.init({
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false
      },
      species: {
        type: DataTypes.STRING,
        allowNull: false
      },
      origin: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, {
      sequelize,
      tableName: 'character',
      schema: 'public',
      timestamps: false
    })

    return this
  }
}*/

const sequelize = new Sequelize("pinflag_challenge", "postgres", "docker", {
  dialect: 'postgres'
})

class Character extends Model { }
Character.init({
  id: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false
  },
  species: {
    type: DataTypes.STRING,
    allowNull: false
  },
  origin: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize, modelName: 'character', tableName: "character", schema: 'public',
  timestamps: false
});


export default Character