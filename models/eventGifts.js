'use strict';
module.exports = function(sequelize, DataTypes) {
  var userEvents = sequelize.define('userEvents', {
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
        // associations can be defined here
      }
    }
  });
  return userEvents;
};