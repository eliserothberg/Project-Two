'use strict';
module.exports = function(sequelize, DataTypes) {
  var Gift = sequelize.define('Gift', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    gift_name: DataTypes.STRING,
    max_price: DataTypes.INTEGER,
    purchased: { type: DataTypes.BOOLEAN, defaultValue: false },
    url:DataTypes.TEXT,
    image_url:DataTypes.TEXT,
    price:DataTypes.DECIMAL,
    deletedAt:DataTypes.DATE,
    user_id:DataTypes.INTEGER,
    event_id:DataTypes.INTEGER
   }, {
   
    classMethods: {
      associate: function(models) {
        Gift.belongsToMany(models.Event, {through: models.Eventgifts, unique:false});
      }
    }
  });

  return Gift;
};