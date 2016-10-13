'use strict';
module.exports = function(sequelize, DataTypes) {
  var giftSearch = sequelize.define('giftSearch', {
    search_name: DataTypes.STRING,
    vendor: DataTypes.STRING,
    price: DataTypes.INT
  }, {
    classMethods: {
      associate: function(models) {
        giftSearch.belongsTo(models.Gift, {
          onDelete: "CASCADE",
          foreignKey: {
            allowNull: false
          }
        })
      }
    }
  });
  return giftSearch;
};