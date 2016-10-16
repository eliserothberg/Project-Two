'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('giftSearches', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      giftName: {
        type: Sequelize.STRING,
        unique:false
      },
      vendor: {
        type: Sequelize.STRING,
        unique:false
      },
      cost: {
        type: Sequelize.DECIMAL,
        unique:false
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('giftSearches');
  }
};