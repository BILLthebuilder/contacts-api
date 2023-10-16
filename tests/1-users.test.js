const chai = require('chai');
const asserttype = require('chai-asserttype');
const chaiHttp = require('chai-http');
const should = require('chai').should();
const server = require('../bin/www');
chai.use(chaiHttp);
chai.use(asserttype);

describe('SUCCESSFUL USER SCENARIOS', () => {
    it('should register user /POST', (done) => {
        const values = {
            phone: '0700 111 222',
            password: 'password',
        };
        chai.request(server)
            .post('/personel/signup')
            .send(values)
            .end((err, result) => {
                result.should.have.status(201);
                result.body.should.be.a('object');
                done();
            });
    });
    it('should login a registered user /POST', (done) => {
        const values = {
            phone: '0700 111 222',
            password: 'password',
        };
        chai.request(server)
            .post('/personel/login')
            .send(values)
            .end((err, result) => {
                result.should.have.status(200);
                result.body.should.be.a('object');
                result.body.should.have.property('accessToken');
                done();
            });
    });
});
