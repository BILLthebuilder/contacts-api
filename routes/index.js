const router = require('express').Router();
const UsersController = require('../controllers/usersController');
const ContactsController = require('../controllers/contactsController');
const Auth = require('../middleware/auth');

// router.post('/api/v1/signup', UsersController.signup);
// router.post('/api/v1/login', UsersController.login);
// router.post('/api/v1/contacts', Auth.verifyToken, ContactsController.createContact);
// router.put('/api/v1/contacts/:id', Auth.verifyToken, ContactsController.updateContact);
// router.get('/api/v1/contacts', Auth.verifyToken, ContactsController.getAllContacts);
// router.get('/api/v1/contacts/:id', Auth.verifyToken, ContactsController.getOne);
// router.delete('/api/v1/contacts/:id', Auth.verifyToken, ContactsController.deleteContact);

// User Routes
router.post('/api/v1/signup', UsersController.signup);
router.post('/api/v1/login', UsersController.login);

// Middleware to verify the token for all the contact routes
router.use('/api/v1', Auth.verifyToken);

// Contacts Routes
router.post('/api/v1/contacts', ContactsController.createContact);
router.put('/api/v1/contacts/:id', ContactsController.updateContact);
router.get('/api/v1/contacts', ContactsController.getAllContacts);
router.get('/api/v1/contacts/:id', ContactsController.getOne);
router.delete('/api/v1/contacts/:id', ContactsController.deleteContact);

module.exports = router;
