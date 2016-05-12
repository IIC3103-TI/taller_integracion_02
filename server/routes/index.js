var express = require('express');
var request = require('request');
var router  = express.Router();

// *** api routes *** //
router.post('/instagram/tag/busca', search_tag);

function isEmpty(str) {
    return (!str || 0 === str.length);
}

// *** get recent tags *** //
function search_tag(req, res) {
	if(isEmpty(req.body.tag) || isEmpty(req.body.access_token)){ return res.end(res.writeHead(400, ''));}
	
	var tags_option = getTagsCount(req.body.tag,req.body.access_token);
	request(tags_option,function(error,response, body) {
		if(error){ res.json({ status:false, result: JSON.parse(error)}); }
	  	var total_tags = JSON.parse(body);
	  	if(total_tags.data.media_count > 0)
	  	{
		  	var tags_info_option = getTagsInfo(req.body.tag,req.body.access_token);
		  	request(tags_info_option,function(error_tags,response_tags,body_tags){
		  		if(error_tags){ return res.json({ status:false, result: JSON.parse(error_tags) }); }

		  		var result = new Object;
		  		result['metadata'] = new Object;
		  		result['metadata']['total'] = total_tags.data.media_count;
		  		result['posts'] = [];
		  		var info_tags = JSON.parse(body_tags);
		  		var data = info_tags.data;
				var len = data.length;
				for(var i = 0; i < len; i ++ )
				{
					var post = new Object;
					post['tags'] 	 = data[i].tags;
					post['username'] = data[i].user.username;
					post['likes']    = data[i].likes.count;
					post['url']      = data[i].images.standard_resolution.url;
					post['caption']  = data[i].caption.text;
 					result['posts'].push(post);
				}
				return res.json(result);

		  	});
	  	}
	})


	
}

function getTagsInfo(tag, access_token)
{
	return {
	  uri:'https://api.instagram.com/v1/tags/'+ tag +'/media/recent?'+
	  'access_token=' + access_token,
	  method: "GET",
	  headers: {
	    'Content-type': 'application/json'
	  }
	};
}

function getTagsCount(tag, access_token)
{
	return {
	  uri:'https://api.instagram.com/v1/tags/'+ tag +'?'+
	  'access_token='+ access_token,
	  method: "GET",
	  headers: {
	    'Content-type': 'application/json'
	  }
	};
}
	



module.exports = router;