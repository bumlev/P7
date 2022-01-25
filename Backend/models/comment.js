'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Comment.belongsTo(models.User , {
        foreignKey: 'UserId',
        as:'user'
      });

      models.Comment.belongsTo(models.Post , {
        foreignKey: 'PostId',
        as:'post'
      })
    }
  };
  Comment.init({
    UserId: {
      type:DataTypes.INTEGER,
      references:{
        model: 'User',
        key : 'id'
      }
    },
    PostId: {
      type:DataTypes.INTEGER,
      references:{
        model: 'Post',
        key: 'id'
      }
    },
    content: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};