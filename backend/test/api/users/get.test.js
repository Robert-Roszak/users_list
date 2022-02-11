const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server.js');
chai.use(chaiHttp);
const expect = chai.expect;
const request = chai.request;

describe('GET /api/users', () => {
  it('should return all users', async () => {
    const res = await request(server).get('/api/users');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body).to.have.lengthOf(10);
  });
});
