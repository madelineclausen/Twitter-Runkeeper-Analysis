function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}

	tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});

	var min_date = tweet_array[0].time;
	var max_date = tweet_array[0].time;
	for (let i=0; i<tweet_array.length; i++)
	{
		if (min_date > tweet_array[i].time)
		{
			min_date = tweet_array[i].time
		}
		if (max_date < tweet_array[i].time)
		{
			max_date = tweet_array[i].time
		}
	}
	const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]; 
	const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	var f_date = min_date.toLocaleDateString().split("/");
	var first_date = weekdays[min_date.getDay()] + ", " + months[f_date[0]-1] + " " + f_date[1] + ", " + f_date[2];
	var l_date = max_date.toLocaleDateString().split("/");
	var last_date = weekdays[max_date.getDay()] + ", " + months[l_date[0]-1] + " " + l_date[1] + ", " + l_date[2];
	
	var completed_count = 0;
	var live_count = 0;
	var achieve_count = 0;
	var misc_count = 0;
	var written_count = 0;

	for (let x=0; x<tweet_array.length; x++)
	{
		if (tweet_array[x].source.localeCompare("completed_event") == 0)
		{
			if (tweet_array[x].written)
			{
				written_count++;
			}
			completed_count++;
		}
		else if (tweet_array[x].source.localeCompare("live_event") == 0)
		{
			live_count++;
		}
		else if (tweet_array[x].source.localeCompare("achievement") == 0)
		{
			achieve_count++;
		}
		else if (tweet_array[x].source.localeCompare("miscellaneous") == 0)
		{
			misc_count++;
		}

	}

	//This line modifies the DOM, searching for the tag with the numberTweets ID and updating the text.
	//It works correctly, your task is to update the text of the other tags in the HTML file!
	document.getElementById('numberTweets').innerText = tweet_array.length;	
	document.getElementById('firstDate').innerText = first_date;	
	document.getElementById('lastDate').innerText = last_date;	
	document.getElementsByClassName('completedEvents')[0].innerText = completed_count;
	document.getElementsByClassName('completedEventsPct')[0].innerText = math.format((completed_count/tweet_array.length)*100,  {notation: 'fixed', precision: 2}) + "%";
	document.getElementsByClassName('liveEvents')[0].innerText = live_count;
	document.getElementsByClassName('liveEventsPct')[0].innerText = math.format((live_count/tweet_array.length)*100,  {notation: 'fixed', precision: 2}) + "%";
	document.getElementsByClassName('achievements')[0].innerText = achieve_count;
	document.getElementsByClassName('achievementsPct')[0].innerText = math.format((achieve_count/tweet_array.length)*100,  {notation: 'fixed', precision: 2}) + "%";
	document.getElementsByClassName('miscellaneous')[0].innerText = misc_count;
	document.getElementsByClassName('miscellaneousPct')[0].innerText = math.format((misc_count/tweet_array.length)*100,  {notation: 'fixed', precision: 2}) + "%";
	document.getElementsByClassName('completedEvents')[1].innerText = completed_count;
	document.getElementsByClassName('written')[0].innerText = written_count;
	document.getElementsByClassName('writtenPct')[0].innerText = math.format((written_count/completed_count)*100,  {notation: 'fixed', precision: 2}) + "%";

}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	loadSavedRunkeeperTweets().then(parseTweets);
});