'use strict';
const {
    Model
} = require('sequelize');
const bcrypt = require('bcrypt');
module.exports = (sequelize, DataTypes) => {
    class Contacts extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Contacts.init({
        // firstName: DataTypes.STRING,
        // lastName: DataTypes.STRING,
        // email: DataTypes.STRING,
        // phone: DataTypes.STRING
        encryptedContacts: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Contacts',
    });

    // Contacts.beforeCreate(async (contacts, options) => {
    //     const salt = await bcrypt.genSaltSync();
    //     contacts.firstName = await bcrypt.hashSync(contacts.firstName, salt);
    //     contacts.lastName = await bcrypt.hashSync(contacts.lastName, salt);
    //     contacts.email = await bcrypt.hashSync(contacts.email, salt);
    //     contacts.phone = await bcrypt.hashSync(contacts.phone, salt);
    // });
    return Contacts;
};
