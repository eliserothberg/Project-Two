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
      type:DataTypes.DATE,
      unique:false
    },
    event_type: DataTypes.STRING,
    deletedAt: DataTypes.DATE,
    user_id: DataTypes.INTEGER
  }, {
  
    // don't delete database entries but set the newly added attribute deletedAt
    // to the current date (when deletion was done). paranoid will only work if
    // timestamps are enabled
      // paranoid: true,

    // don't use camelcase for automatically added attributes but underscore style
    // so updatedAt will be updated_at
    // underscored: true,

    // disable the modification of tablenames
    // freezeTableName: true,

    // define the table's name
    // tableName: 'events',

    classMethods: {
      associate: function(models) {
        Event.belongsToMany(models.User, {through: models.Userevents, unique:false});
        Event.belongsToMany(models.Gift, {through: models.Eventgifts, unique:false});
        // Event.hasOne(models.Gift);
        // Event.belongsTo(models.User, {
        //   onDelete: "CASCADE",
        //   foreignKey: {
        //     allowNull: false
        //   }
        // })
      }
    }
  });

  return Event;
};
