const express = require('express');
const request = require('request');
const cheerio = require('cheerio');
const app = express();
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
  next();
});
app.get('/', async function(req, res) {
    var channelId="";
    var playlistId="";
    var Subscribers="";
    var countVideos="";
    var json =[];
    url = 'https://www.youtube.com/channel/UCdMlRsMbFEqN5JtiF4kSX6g';
	var data = await new Promise(function (resolve, reject){
		request(url, function(error, response, html) {
          if(!error) {
            $ = cheerio.load(html);
			channelId = $('meta[itemprop="channelId"]').attr('content');
			playlistId = $('div[id="play-button"] > a').attr('href');
			Subscribers = $('[id="subscriber-count"]').text();
			request(playlistId, function(error, response, html) {
				if(!error) {
					$ = cheerio.load(html);
					countVideos = $('#publisher-container > div > yt-formatted-string > span:nth-child(3)').text();
				}else{
					reject(undefined);
				}
				resolve({
					channelId: channelId,
					playlistId: playlistId,
					Subscribers: Subscribers,
					countVideos: countVideos,
				});	
				
			});
          }else{
            reject(undefined);
          }
        });
    });
    json.push(data);

  res.send(json);
});
app.listen(process.env.PORT || 5000);
module.exports = app;
