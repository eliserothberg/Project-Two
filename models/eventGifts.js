'use strict';
module.exports = function(sequelize, DataTypes) {
  var Eventgifts = sequelize.define('Eventgifts', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    eventId: {
      type:DataTypes.INTEGER
    },
    giftId: {
      type:DataTypes.INTEGER
    } 
  }, {
    classMethods: {
      associate: function(models) {
      }
    }
  });
  return Eventgifts;
};