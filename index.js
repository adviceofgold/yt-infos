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
    var query = req.query.q;
    var url = decodeURIComponent(query);
    var prediction="";
    var channelId="";
    var playlistId=;
    var Subscribers="";
    var countVideos="";
    var json =[];
    var tmp;
    //url = 'https://www.youtube.com/channel/UCdMlRsMbFEqN5JtiF4kSX6g';
    var data = await new Promise(function (resolve, reject){
        request(url, function(error, response, html) {
          if(!error) {
            $ = cheerio.load(html);
            channelId = $('meta[itemprop="channelId"]').attr('content');
		  
            resolve({
                channelId: channelId,
                //playlistId: playlistId,
		//Subscribers: Subscribers,
		//countVideos: countVideos,
            });
          }else{
            reject(undefined);
          }
        });
    });
      json.push(data);
  res.send(json);
});
app.listen(process.env.PORT || 80);
module.exports = app;
