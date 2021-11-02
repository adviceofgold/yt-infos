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
    //var queryString = window.location.search;
    //var url = new URLSearchParams(queryString).get('q');
    var query = req.query.q;
    var url = decodeURIComponent(query);
    var prediction="";
    var channelId="";
    var playlistId=;
    var Subscribers="";
    var countVideos="";
    var json =[];
    var tmp;
    var jsonData;
    //url = 'https://www.youtube.com/channel/UCdMlRsMbFEqN5JtiF4kSX6g';
    var data = await new Promise(function (resolve, reject){
        request(url, function(error, response, html) {
          if(!error) {
            $ = cheerio.load(html);
            channelId = $('meta[itemprop="channelId"]').attr('content');
	    //playlistId = $('script').get()[14].children[0].data; 
	    //playlistId = ($.match(/ytInitialData[^{]*(.*?);\s*<\/script>/s))[1];
            //playlistId = $('body > script').text();
	    //playlistId = $('body > script:nth-child(16)').html();
	    //playlistId = JSON.stringify(JSON.parse(playlist),null,2);  
      	    tmp = $('body > script:nth-child(16)').html().substring(21).replace(';','');
	    jsonData = JSON.parse(tmp);
      	    //jsonData = $('body > script:nth-child(16)').html().substring(21).replace(';','');
	    playlistId = jsonData.contents.twoColumnBrowseResultsRenderer.tabs[0].tabRenderer.content.sectionListRenderer.contants[0].itemSectionRenderer.contents[0].shelfRender.playAllButton.buttonRender.navigationEndpoint.watchEndpoint.playlistId;
//var findAndClean = findTextAndReturnRemainder(text,"var foo =");
//var result = JSON.parse(findAndClean);
            //playlistId = $('script[32]').split('{"url":"/playlist?list=')[1].split('\u0026playnext', 1)[0].split('"', 1)[0];
	    //playlistId = $('div[id="play-button"] > ytd-button-renderer > a').attr('href');
	    // playlistId = $('#play-button > ytd-button-renderer > a').attr('href');
            //Subscribers = $('#subscriber-count').attr('aria-label').split(" ")[0];
            //Subscribers = $('#subscriber-count').text();
            resolve({
                channelId: channelId,
                playlistId: playlistId,
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
