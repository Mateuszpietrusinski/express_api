const app = require('../app');
const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;
describe('Orders', () => {
   it("Get all orders", (done) => {
       request(app).get("/orders")
           .expect(200)
           .then(res =>{
               expect(res.body.Message).to.equal('All Orders');
               done();
           })
   })
});