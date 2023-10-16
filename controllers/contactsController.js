const { Contacts } = require('../models');
const {
    utilGetAll,
    utilCreate,
    utilGetOne,
    utilUpdate,
    utilDelete,
} = require('../helpers/utilService');
const crypto = require('crypto');
const globalErr = require('../helpers/globalError');
const { encryptData } = require('../helpers/encryption');

const contactMethods = {
    async createContact(req, res) {
        const { firstName, lastName, email, phone } = req.body;
        const values = { firstName, lastName, email, phone };
        const encryptedContacts = encryptData(JSON.stringify(values));
        try {
            await utilCreate(req, res, Contacts, { encryptedContacts });
        } catch (error) {
            res.status(500).json(globalErr);
        }
    },
    async getOne(req, res) {
        const { id } = req.params;
        await utilGetOne(req, res, Contacts, id);
    },
    async getAllContacts(req, res, next) {
        try {
            const contacts = await utilGetAll(req, res, Contacts);
            return contacts;
        } catch (error) {
            res.status(500).json({
                globalErr,
            });
        }
    },
    async updateContact(req, res) {
        const { firstName, lastName, email, phone } = req.body;
        const { id } = req.params;
        const values = { firstName, lastName, email, phone };
        const encryptedContacts = encryptData(JSON.stringify(values));
        try {
            await utilUpdate(req, res, Contacts, { encryptedContacts }, id);
        } catch (error) {
            console.log(error);
            res.status(422).json(globalErr);
        }
    },
    async deleteContact(req, res) {
        const { id } = req.params;
        try {
            await utilDelete(req, res, Contacts, id);
        } catch (error) {
            console.log(error);
            res.status(422).json(globalErr);
        }
    },
};

module.exports = contactMethods;
