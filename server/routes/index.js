var express = require('express');
var request = require('request');
var router  = express.Router();

// *** api routes *** //
router.post('/instagram/tag/busca', buscaTag);

// *** get recent tags *** //
function buscaTag(req, res) {
 request({
  uri:'https://api.instagram.com/v1/tags/'+req.body.tag+'/media/recent?'+
  'access_token='+req.body.access_token,
  //55108941.333f3d3.d3e98640f2874c6cb7fe1a114f2e9524',
  method: "GET"
}, function(error, response, body) {
  res.json(body);
});
}

module.exports = router;