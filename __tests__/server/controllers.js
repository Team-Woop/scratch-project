const request = require('supertest');
const controller = require('../../server/controllers/controller.js')

const server = 'http://localhost:3000';

describe('Testing the root end point', () => {
  describe('/', () => {
    describe('GET', () => {
      it('responds with 200 status and text/html content type', () => {
        return request(server)
          .get('/')
          .expect('Content-Type', /text\/html/)
          .expect(200);
      });
    });
  });
  
  describe('/submit', () => {
    describe('GET', () => {
      it('Responds with 200 status, a JSON object', () => {
        return request (server)
        .get('/submit/?originCity=Brooklyn&originState=NY&destinationState=CO&destinationCity=Denver&mpg=50&totalCapacity=10')
        .expect(200)
        .expect('Content-Type', /application\/json/)
      });
      it('JSON object response parses to a Number', () => {
        return request (server)
        .get('/submit/?originCity=Brooklyn&originState=NY&destinationState=CO&destinationCity=Denver&mpg=50&totalCapacity=10')
        .then(res => {
          expect(typeof res.body).toBe('number')
        })
      })
    })
  })
})

describe ("Testing controller middleware", () => {
  describe('controller.getSteps', () => {

    const req = {query: {}, params: {}};
    const res = {locals: {}};
    const next = (arg) => {
      if (arg) throw new Error('middleware error');
    };

    it('handles req.query and attaches correct values to res.locals', async () => {
      req.query =  {
        originCity: 'Brooklyn',
        originState: 'NY',
        destinationState: 'CO',
        destinationCity: 'Denver',
        mpg: '50',
        totalCapacity: '10'
      }

      await controller.getSteps(req, res, next);
      expect(res.locals.distance).toBe('1,780 mi');
      expect(res.locals.mpg).toBe('50');
      expect(res.locals.originState).toBe('NY');
    })

    xit('throws error if req.query is formatted incorrectly', async () => {
      req.query = {
        origin: 'asf'
      }
      const result = await controller.getSteps(req, res, next);
      expect(result).toBeInstanceOf(Error);
    })
  })
})