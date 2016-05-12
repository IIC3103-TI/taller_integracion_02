var expect = require('chai').expect;
var request = require('request');
var server = require('../server');

describe('Instagram integration', function() {
  it('should list images from tag search on /instagram/tag/busca POST', function(done) {
this.timeout(0);

 request({
  uri:'https://api.instagram.com/v1/tags/chile/media/recent?'+
  'access_token=55108941.333f3d3.d3e98640f2874c6cb7fe1a114f2e9524',
  method: "GET"
}, function(error, response, body) {

      expect(response).to.exist;
      expect(response.statusCode).to.equal(200);
      expect(body).be.json;
      var json = JSON.parse(response.body);
      expect(json).to.have.property("data");
      //expect(json.data).to.have.length.above(0);
      //expect(data[0]).to.have.property("data");
     done();
    });
  });
});