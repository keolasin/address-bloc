'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Contacts', { //first arg is name of table, second is obj of key-value pairs
      id: { //defines a property called key
        allowNull: false, //prop cannot be null
        autoIncrement: true, //is incremented automatically
        primaryKey: true, //primary key is a unique key that IDs an object
        type: Sequelize.INTEGER //sets prop type, only values of this type are allowed
      },
      name: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Contacts');
  }
};
