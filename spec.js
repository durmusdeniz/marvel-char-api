var request = require('supertest');
describe('loading express', function () {
    var server;
    before(function () {
        server = require('./index');
    });
    after(function () {
        process.exit(1);
    })
    it('responds to /characters', function testSlash(done) {
        request(server)
            .get('/characters')
            .expect(200, done);
    });
    it('responds to /characters/{id}', function testSlash(done) {
        request(server)
            .get('/characters/11111')
            .expect(200, done);
    });

    it('responds to swagger ui', function testSlash(done) {
        request(server)
            .get('/api-docs/')
            .expect(200, done);
    });

    it('404 everything else', function testPath(done) {
        request(server)
            .get('/char/sthelse')
            .expect(404, done);
    });
});