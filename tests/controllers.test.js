const chai = require('chai');
const asserttype = require('chai-asserttype');
const chaiHttp = require('chai-http');
const should = require('chai').should();
const server = require('../bin/www');
const UsersController = require('../controllers/usersController');
const TasksController = require('../controllers/tasksController');

chai.use(chaiHttp);
chai.use(asserttype);

describe('CONTROLLER METHODS', () => { 
    it('should define usercontroller methods', (done) => {
        chai.expect(UsersController).to.be.an('object');
        chai.expect(UsersController.signup).to.be.a('function');
        chai.expect(UsersController.login).to.be.a('function');
        done();
    });
    it('should define taskscontroller methods', (done) => {
        chai.expect(TasksController).to.be.an('object');
        chai.expect(TasksController.createTask).to.be.a('function');
        chai.expect(TasksController.listAndCountTasks).to.be.a('function');
        done();
    });
});
