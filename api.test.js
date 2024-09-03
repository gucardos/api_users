const { app, server} = require('./index.js'); // Importe seu aplicativo Express
const supertest = require('supertest');


describe('Teste GET /users', () => {

it('deve responder com status 200', async () => {

const response = await supertest(app).get('/users');

expect(response.statusCode).toBe(200);

});

});

beforeAll( () => {
    server.on('error', async (e) => {
        if (e.code === 'EADDRINUSE') {
          await server.close()
        }
      });
})

afterAll(() => {
    server.close();
});
