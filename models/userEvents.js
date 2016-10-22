'use strict';
module.exports = function(sequelize, DataTypes) {
  var Userevents = sequelize.define('Userevents', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    eventId: {
      type:DataTypes.INTEGER
    },
    userId: {
      type:DataTypes.INTEGER
    }
  }, {
    classMethods: {
      associate: function(models) {
      }
    }
  });
  return Userevents;
};