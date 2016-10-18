'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
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
        User.belongsToMany(models.Event, {through: models.Userevents, unique:false});
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
