function parseTweets(runkeeper_tweets) {
    // Do not proceed if no tweets loaded
    if (runkeeper_tweets === undefined) {
        window.alert('No tweets returned');
        return;
    }

    tweet_array = runkeeper_tweets.map(function (tweet) {
        return new Tweet(tweet.text, tweet.created_at);
    });

    filtered_tweet_array = tweet_array.filter(function (tweet) {
        return tweet.written;
    });
	document.getElementById('searchText').innerText = "";
    document.getElementById('searchCount').innerText = filtered_tweet_array.length;
    const searchInput = document.getElementById('textFilter');
    searchInput.addEventListener('input', function () {
        addEventHandlerForSearch(filtered_tweet_array);
    });
}

function addEventHandlerForSearch(filtered_tweet_array) {
    const searchInput = document.querySelector('#textFilter');
    document.getElementById('searchText').innerText = searchInput.value;

    const filtered_array = filtered_tweet_array.filter(function (tweet) {
        return tweet.writtenText.includes(searchInput.value);
    });
    const table = document.getElementById("tweetTable");
	table.innerHTML = "";
	document.getElementById('searchCount').innerText = filtered_array.length;
    for (let z = 0; z < filtered_array.length; z++) {
        const rowHTML = filtered_array[z].getHTMLTableRow(z + 1, filtered_array[z]);
		var row = table.insertRow(z);
		row.insertCell(0).outerHTML = rowHTML; 
    }	
}

// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
    loadSavedRunkeeperTweets().then(parseTweets);
});