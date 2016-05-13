var express = require('express');
var request = require('request');
var router  = express.Router();

var is_empty = function(str) {
    return (!str || 0 === str.length);
}

var get_tags_info = function(tag, access_token)
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

var get_tags_count = function(tag, access_token)
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

var search_tag = function(req, res) {
	if(is_empty(req.body.tag) || is_empty(req.body.access_token)){ return res.end(res.writeHead(400, ''));}
	var tags_option = get_tags_count(req.body.tag,req.body.access_token);
	request(tags_option,function(error,response, body) {
		if(error){ return res.json({ status:false, result: JSON.parse(error)}); }
	  	var total_tags = JSON.parse(body);
	  	if(total_tags.data && total_tags.data.media_count > 0)
	  	{
		  	var tags_info_option = get_tags_info(req.body.tag,req.body.access_token);
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
					if(data[i].caption)
					{
						post['caption']  = data[i].caption.text;
					}
 					result['posts'].push(post);
				}
				result['version'] = '1.0.0';
				return res.json(result);

		  	});
	  	}else
	  	{
	  		return res.json({ status:false, result: ''});
	  	}
	})


	
}
	
// *** api routes *** //
router.post('/instagram/tag/busca', search_tag);



module.exports = {

	is_empty       : is_empty,
	get_tags_info  : get_tags_info,
	get_tags_count : get_tags_count,
	search_tag     : search_tag,
	router		   : router

};
