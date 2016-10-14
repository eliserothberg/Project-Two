'use strict';
module.exports = function(sequelize, DataTypes) {
  var Event = sequelize.define('Event', {
    recipient_name: DataTypes.STRING,
    event_date: DataTypes.DATE,
    event_type: DataTypes.STRING
  }, {
  
    // don't delete database entries but set the newly added attribute deletedAt
    // to the current date (when deletion was done). paranoid will only work if
    // timestamps are enabled
      paranoid: true,

    // don't use camelcase for automatically added attributes but underscore style
    // so updatedAt will be updated_at
    underscored: true,

    // disable the modification of tablenames
    freezeTableName: true,

    // define the table's name
    tableName: 'events',

    classMethods: {
      associate: function(models) {
        Event.belongsTo(models.User, {
          onDelete: "CASCADE",
          foreignKey: {
            allowNull: false
          }
        })
      }
    }
  });

  return Event;
};
