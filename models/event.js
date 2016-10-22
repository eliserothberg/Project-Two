'use strict';
module.exports = function(sequelize, DataTypes) {
  var Event = sequelize.define('Event', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    recipient_name: DataTypes.STRING,
    event_date: {
      type:DataTypes.DATEONLY
    },
    event_type: DataTypes.STRING,
    deletedAt: DataTypes.DATE,
    user_id: DataTypes.INTEGER,
    notify_date: DataTypes.DATEONLY,
    email_sent: DataTypes.BOOLEAN
  }, {

    classMethods: {
      associate: function(models) {
        Event.belongsTo(models.User, {foreignKey: 'user_id'});
        Event.belongsToMany(models.Gift, {through: models.Eventgifts, unique:false});
      }
    }
  });

  return Event;
};
