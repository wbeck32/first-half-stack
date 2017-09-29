const chai = require('chai');
const assert = chai.assert;
const connect = require('../lib/utils/connect');
const connection = require('mongoose').connection;
const req = require('../lib/utils/request');
const db = require('../lib/utils/db');
const seedPeople = require('./seedPeople')

describe('e2e person tests', () => {
  let seededPeople = []

  before(() => {
    connect();
    db.drop();
  })

  it('POST /people', async () => {
    for (let i = 0; i < seedPeople.length; i++) {
      const person = await req
        .post('/people')
        .send(seedPeople[i])
      seededPeople.push(person.body)
    }
    assert.equal(seededPeople.length, 6);
  });
  it('GET /people', async () => {
    // send parameters home, likesRollerCoasters
    const foundPeople = await req.get('/people');
    assert.lengthOf(foundPeople.body, 5);
    const query = 'likesRollerCoasters=true'
    // const lRC = await req.get('/people').query({name:'paul'})
    return req.get('/people').query({likesRollerCoasters:true})
    .then(results => console.log(47, results.body))

    // console.log(333, lRC)
  }),
  it('GET /people/:id', async () => {
    const id = seededPeople[0]._id;
    const getOneById = await req.get(`/people/${id}`);
    assert(seededPeople[0].name, getOneById.body.name);
  }),
  it('PUT /people/:id', async () => {
    const id = seededPeople[4]._id;
    const updatedUser = await req
      .put(`/people/${id}`)
      .send({
        name: 'larry jones',
        likesRollerCoasters: true,
        heightInInches: 90
      });
    assert.equal(updatedUser.body.name, 'larry jones');
    assert.notEqual(
      updatedUser.body.likesRollerCoasters,
      seededPeople[2].likesRollerCoasters
    );
  }),
  it('DELETE /people/:id', async () => {
    const getOne = await req.get('/people');
    const id = seededPeople[3]._id;
    const deleted = await req.delete(`/people/${id}`);
    assert.doesNotHaveAnyKeys(deleted.body);
    assert.isEmpty(deleted.body);
  });
});
