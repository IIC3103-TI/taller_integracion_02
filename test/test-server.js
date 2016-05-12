var expect = require('chai').expect;
var request = require('request');
var server = require('../server');
var access_token = '2019746130.59a3f2b.86a0135240404ed5b908a14c0a2d9402';

describe('Instagram integration', function() {
  it('should get extra info from tag', function(done) {
       //this.timeout(0);
       request({
        uri:'https://api.instagram.com/v1/tags/chile/media/recent?'+
        'access_token=' + access_token,
        method: "GET"
      }, function(error, response, body) {
            expect(response).to.exist;
            expect(response.statusCode).to.equal(200);
            expect(body).be.json;
            var json = JSON.parse(response.body);
            expect(json).to.have.property("data");
           done();
          });
  });

   it('should list images from tag search', function(done) {
     //this.timeout(0);
     request({
      uri:'https://api.instagram.com/v1/tags/chile/media/recent?'+
      'access_token=' + access_token,
      method: "GET"
    }, function(error, response, body) {

          expect(response).to.exist;
          expect(response.statusCode).to.equal(200);
          expect(body).be.json;
          var json = JSON.parse(response.body);
          expect(json).to.have.property("data");
         done();
        });
      });
});