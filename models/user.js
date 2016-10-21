'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    username: DataTypes.STRING, 
    email: DataTypes.STRING,
    password_hash: DataTypes.STRING,
    active: DataTypes.BOOLEAN
  }, {
    // don't use camelcase for automatically added attributes but underscore style
    // underscored: true,

    // disable the modification of tablenames
    // freezeTableName: true,

    // define the table's name
    // tableName: 'users',

    classMethods: {
      associate: function(models) {
        User.hasMany(models.Event, {foreignKey: 'user_id'});
        // User.hasMany(models.Event, {onDelete: 'cascade', hooks:true});
        // User.hasMany(models.Gift, {
        //   onDelete: "CASCADE",
        //   hooks: true,
        //   foreignKey: {
        //     allowNull: false
        //   }
        // })
        // User.hasMany(models.Event, {
        //   onDelete: "CASCADE",
        //   hooks: true,
        //   foreignKey: {
        //     allowNull: false
        //   }
        // })
      }
    }
  })

  return User;
};
