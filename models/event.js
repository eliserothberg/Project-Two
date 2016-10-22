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
        Event.belongsTo(models.User, {
          foreignKey: 'user_id'
        });
        Event.belongsToMany(models.Gift, {
          onDelete:"CASCADE",
          through: models.Eventgifts,
          unique:false
        });
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
