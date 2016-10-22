'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    username: DataTypes.STRING, 
    email: DataTypes.STRING,
    password_hash: DataTypes.STRING,
    active: DataTypes.BOOLEAN
  }, {

    classMethods: {
      associate: function(models) {
        User.hasMany(models.Event, {foreignKey: 'user_id'});
      }
    }
  })

  return User;
};
