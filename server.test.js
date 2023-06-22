require('dotenv').config();
const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('./server');

// Snapshot
// Expect the exported object from server.js to match the snapshot
test('server.js matches the snapshot', () => {
  expect(app).toMatchSnapshot();
});

// Unit test 
describe('Server', () => {
    it('should have the expected properties and methods', () => {
        // Test if the app object has the expected properties and methods
        expect(app).toHaveProperty('use');
        expect(app).toHaveProperty('listen');
    });

    it('should listen on the specified port', () => {
        // Expected port the server should listen on
        const expectedPort = 3001;
    }); 
}); 