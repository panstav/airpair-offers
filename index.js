if (!process.env.HEROKU){
	require('./keys')
}

var Twit = require('twit');
var twit = new Twit(
	{
		consumer_key:         process.env.consumer_key,
		consumer_secret:      process.env.consumer_secret,
		access_token:         process.env.access_token,
		access_token_secret:  process.env.access_token_secret
	}
);

var offerRgx = /^Get paid \$\d+\/hr.+$/g;

var airpairStream = twit.stream('statuses/filter', { follow: '3156019219' });
airpairStream.on('tweet', function(tweet){

	if (offerRgx.test(tweet.text)){

		var offer = {
			text: tweet.text,
			link: tweet.entities.urls[0].expanded_url
		};
		
		console.log('New offer!\n', offer);

	}
});

console.log('Listening to tweets.');

airpairStream.on('error', function (err) {
	console.log('#Twit.ERROR:', err);
});
airpairStream.on('disconnect', function (disconnection) {
	console.log('#Twit.DISCONNECTED:', disconnection);
});