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
    user_id:DataTypes.INTEGER
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
    // tableName: 'gifts',

    classMethods: {
      associate: function(models) {
        Gift.belongsToMany(models.Event, {through: models.Eventgifts, unique:false});


            // Gift.hasOne(models.Events);
        // Gift.belongsTo(models.User, {
        //   onDelete: "CASCADE",
        //   foreignKey: {
        //     allowNull: false
        //   }
        // })
      }
    }
  });

  return Gift;
};