var expect = require('chai').expect;
var request = require('request');
var server = require('../server');
var index  = require('../server/routes')
var access_token = '2019746130.59a3f2b.86a0135240404ed5b908a14c0a2d9402';
var url = process.env.URL_APP || 'http://localhost:5000';

describe('Instagram integration', function() {
  /*it('expect get extra info from tag', function(done) {
       this.timeout(0);
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

   it('expect list images from tag search', function(done) {
     this.timeout(0);
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
      });*/

   it('expect list from instagram/tag/busca', function(done) {
     this.timeout(0);
     request({
      url: url +'/instagram/tag/busca',
      form:{
        tag:'chile',
        access_token: access_token
      },
      method: 'POST'
    }, function(error, response, body) {
          expect(response).to.exist;
          expect(response.statusCode).to.equal(200);
          //expect(body).be.json;
          //var json = JSON.parse(response.body);
          //expect(body).to.have.property("posts");
         done();
        });
      });

   it('expect 400 from instagram/tag/busca', function(done) {
     this.timeout(0);
     request({
      url: url +'/instagram/tag/busca',
      form:{
        access_token: ''
      },
      method: 'POST'
    }, function(error, response, body) {
          expect(response.statusCode).to.equal(400);
         done();
        });
      });

   it('expect error from instagram api', function(done) {
     this.timeout(0);
     request({
      url: url +'/instagram/tag/busca',
      form:{
        tag: 'chile',
        access_token: 'api_fake'
      },
      method: 'POST'
    }, function(error, response, body) {
          expect(response.statusCode).to.equal(200);
         done();
        });
      });

   it('expect string be empty', function(done) {
      var empty_string = index.is_empty('');
      expect(empty_string).to.equal(true);
      done();
   });

  it('expect option_tag_count be json', function(done) {
      var result = index.get_tags_count('tag','token');
      expect(result).be.json;
      done();
   });

   it('expect option_tag_info be json', function(done) {
      var result = index.get_tags_info('tag','token');
      expect(result).be.json;
      done();
   });

});
