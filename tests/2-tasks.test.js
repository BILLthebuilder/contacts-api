const chai = require('chai');
const asserttype = require('chai-asserttype');
const chaiHttp = require('chai-http');
const should = require('chai').should();
const server = require('../bin/www');
chai.use(chaiHttp);
chai.use(asserttype);
const loginValues = {
    phone: '0700 111 222',
    password: 'password',
};
describe('SUCCESSFUL TASK SCENARIOS', () => {
    it('should create task when logged in /POST', (done) => {
        chai.request(server)
            .post('/personel/login')
            .send(loginValues)
            .end((err, result) => {
                result.should.have.status(200);
                const token = result.body.accessToken;
                chai.request(server)
                    .post('/tasks')
                    .set('authorization', `Bearer ${token}`)
                    .end((err, result) => { 
                        result.should.have.status(201);
                        result.body.should.be.a('object');
                        done();
                    });
            });
    });
    it('should list tasks when logged in /GET', (done) => {
        chai.request(server)
            .post('/personel/login')
            .send(loginValues)
            .end((err, result) => {
                result.should.have.status(200);
                const token = result.body.accessToken;
                chai.request(server)
                    .get('/tasks?limit=10&page=1')
                    .set('authorization', `Bearer ${token}`)
                    .end((err, result) => { 
                        result.should.have.status(200);
                        result.body.should.be.a('object');
                        done();
                    });
            });
    });
});
