'use strict';
module.exports = function(sequelize, DataTypes) {
  var search = sequelize.define('search', {
    search_name: DataTypes.STRING,
    vendor: DataTypes.STRING,
    price: DataTypes.DECIMAL
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return search;
};