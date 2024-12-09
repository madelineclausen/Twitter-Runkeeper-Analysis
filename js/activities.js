function parseTweets(runkeeper_tweets) {
    //Do not proceed if no tweets loaded
    if(runkeeper_tweets === undefined) {
        window.alert('No tweets returned');
        return;
    }
    
    tweet_array = runkeeper_tweets.map(function(tweet) {
        return new Tweet(tweet.text, tweet.created_at);
    });

    //TODO: create a new array or manipulate tweet_array to create a graph of the number of tweets containing each type of activity.
    var activity_dict = {};
    var num_activities = 0;
    for (let x=0; x<tweet_array.length; x++)
    {
        if (tweet_array[x].activityType in activity_dict)
        {
            activity_dict[tweet_array[x].activityType] = activity_dict[tweet_array[x].activityType] + 1;
        }
        else
        {
            num_activities++;
            activity_dict[tweet_array[x].activityType] = 1;
        }
    }
    activity_list = [];
    for (var key in activity_dict) 
    {
        if (key.localeCompare("unknown") != 0)
        {
            activity_list.push([ key, activity_dict[key] ]);
        }
    }
    activity_list.sort(function(value1, value2) {return value1 - value2;});
    const top_three = activity_list.slice(0, 3);

    document.getElementById('numberActivities').innerText = num_activities-1; 
    document.getElementById('firstMost').innerText = top_three[0][0];   
    document.getElementById('secondMost').innerText = top_three[1][0];  
    document.getElementById('thirdMost').innerText = top_three[2][0];

    //getting array of top distances
    topdistances = {};
    topdistances[top_three[0][0]] = 0;
    topdistances[top_three[1][0]] = 0;
    topdistances[top_three[2][0]] = 0;

    //adding all distance
    for(let x = 0; x < tweet_array.length; x++){
        if (tweet_array[x].activityType.localeCompare(top_three[0][0]) == 0)
        {
            topdistances[top_three[0][0]] += tweet_array[x].distance;
        }
        else if (tweet_array[x].activityType.localeCompare(top_three[1][0]) == 0)
        {
            topdistances[top_three[1][0]] += tweet_array[x].distance;
        }
        else if (tweet_array[x].activityType.localeCompare(top_three[2][0]) == 0)
        {
            topdistances[top_three[2][0]] += tweet_array[x].distance;
        }

    }


    //getting average
    topdistances[top_three[0][0]] = topdistances[top_three[0][0]]/top_three[0][1];
    topdistances[top_three[1][0]] = topdistances[top_three[1][0]]/top_three[1][1];
    topdistances[top_three[2][0]] = topdistances[top_three[2][0]]/top_three[2][1];

    //sorting dictionary by distance
    var items = Object.keys(topdistances).map(function(key) {
        return [key, topdistances[key]];
      });
      
      // Sort the array based on the second element
      items.sort(function(first, second) {
        return second[1] - first[1];
      });
      
    document.getElementById('longestActivityType').innerText = items[0][0];
    document.getElementById('shortestActivityType').innerText = items[2][0];
    
    alltop = {};
    alltop["Sunday"] = {};
    alltop["Monday"] = {};
    alltop["Tuesday"] = {};
    alltop["Wednesday"] = {};
    alltop["Thursday"] = {};
    alltop["Friday"] = {};
    alltop["Saturday"] = {};

    alltop["Sunday"][top_three[0][0]] = 0;
    alltop["Sunday"][top_three[1][0]] = 0;
    alltop["Sunday"][top_three[2][0]] = 0;
    alltop["Monday"][top_three[0][0]] = 0;
    alltop["Monday"][top_three[1][0]] = 0;
    alltop["Monday"][top_three[2][0]] = 0;
    alltop["Tuesday"][top_three[0][0]] = 0;
    alltop["Tuesday"][top_three[1][0]] = 0;
    alltop["Tuesday"][top_three[2][0]] = 0;
    alltop["Wednesday"][top_three[0][0]] = 0;
    alltop["Wednesday"][top_three[1][0]] = 0;
    alltop["Wednesday"][top_three[2][0]] = 0;
    alltop["Thursday"][top_three[0][0]] = 0;
    alltop["Thursday"][top_three[1][0]] = 0;
    alltop["Thursday"][top_three[2][0]] = 0;
    alltop["Friday"][top_three[0][0]] = 0;
    alltop["Friday"][top_three[1][0]] = 0;
    alltop["Friday"][top_three[2][0]] = 0;
    alltop["Saturday"][top_three[0][0]] = 0;
    alltop["Saturday"][top_three[1][0]] = 0;
    alltop["Saturday"][top_three[2][0]] = 0;

    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    weekendcount = 0;
    weekdaycount = 0;

    
    for(let x = 0; x < tweet_array.length; x++){
        if (tweet_array[x].time.getDay() == 0){
            
            if (tweet_array[x].activityType.localeCompare(top_three[0][0]) == 0)
            {
                alltop["Sunday"][top_three[0][0]] += tweet_array[x].distance;
            }
            else if (tweet_array[x].activityType.localeCompare(top_three[1][0]) == 0)
            {
                alltop["Sunday"][top_three[1][0]] += tweet_array[x].distance;
            }
            else if (tweet_array[x].activityType.localeCompare(top_three[2][0]) == 0)
            {
                alltop["Sunday"][top_three[2][0]] += tweet_array[x].distance;
            }   
            weekendcount += 1;
        }
        else if (tweet_array[x].time.getDay() == 1){
            if (tweet_array[x].activityType.localeCompare(top_three[0][0]) == 0)
            {
                alltop["Monday"][top_three[0][0]] += tweet_array[x].distance;
            }
            else if (tweet_array[x].activityType.localeCompare(top_three[1][0]) == 0)
            {
                alltop["Monday"][top_three[1][0]] += tweet_array[x].distance;
            }
            else if (tweet_array[x].activityType.localeCompare(top_three[2][0]) == 0)
            {
                alltop["Monday"][top_three[2][0]] += tweet_array[x].distance;
            }   
            weekdaycount += 1; 
        }else if (tweet_array[x].time.getDay() == 2){
            if (tweet_array[x].activityType.localeCompare(top_three[0][0]) == 0)
            {
                alltop["Tuesday"][top_three[0][0]] += tweet_array[x].distance;
            }
            else if (tweet_array[x].activityType.localeCompare(top_three[1][0]) == 0)
            {
                alltop["Tuesday"][top_three[1][0]] += tweet_array[x].distance;
            }
            else if (tweet_array[x].activityType.localeCompare(top_three[2][0]) == 0)
            {
                alltop["Tuesday"][top_three[2][0]] += tweet_array[x].distance;
            }   
            weekdaycount += 1; 
        }else if (tweet_array[x].time.getDay() == 3){
            if (tweet_array[x].activityType.localeCompare(top_three[0][0]) == 0)
            {
                alltop["Wednesday"][top_three[0][0]] += tweet_array[x].distance;
            }
            else if (tweet_array[x].activityType.localeCompare(top_three[1][0]) == 0)
            {
                alltop["Wednesday"][top_three[1][0]] += tweet_array[x].distance;
            }
            else if (tweet_array[x].activityType.localeCompare(top_three[2][0]) == 0)
            {
                alltop["Wednesday"][top_three[2][0]] += tweet_array[x].distance;
            }   
            weekdaycount += 1; 
        }else if (tweet_array[x].time.getDay() == 4){
            if (tweet_array[x].activityType.localeCompare(top_three[0][0]) == 0)
            {
                alltop["Thursday"][top_three[0][0]] += tweet_array[x].distance;
            }
            else if (tweet_array[x].activityType.localeCompare(top_three[1][0]) == 0)
            {
                alltop["Thursday"][top_three[1][0]] += tweet_array[x].distance;
            }
            else if (tweet_array[x].activityType.localeCompare(top_three[2][0]) == 0)
            {
                alltop["Thursday"][top_three[2][0]] += tweet_array[x].distance;
            }   
            weekdaycount += 1; 
        }else if (tweet_array[x].time.getDay() == 5){
            if (tweet_array[x].activityType.localeCompare(top_three[0][0]) == 0)
            {
                alltop["Friday"][top_three[0][0]] += tweet_array[x].distance;
            }
            else if (tweet_array[x].activityType.localeCompare(top_three[1][0]) == 0)
            {
                alltop["Friday"][top_three[1][0]] += tweet_array[x].distance;
            }
            else if (tweet_array[x].activityType.localeCompare(top_three[2][0]) == 0)
            {
                alltop["Friday"][top_three[2][0]] += tweet_array[x].distance;
            }   
            weekdaycount += 1; 
        }
        else if (tweet_array[x].time.getDay() == 6){
            
            if (tweet_array[x].activityType.localeCompare(top_three[0][0]) == 0)
            {
                alltop["Saturday"][top_three[0][0]] += tweet_array[x].distance;
            }
            else if (tweet_array[x].activityType.localeCompare(top_three[1][0]) == 0)
            {
                alltop["Saturday"][top_three[1][0]] += tweet_array[x].distance;
            }
            else if (tweet_array[x].activityType.localeCompare(top_three[2][0]) == 0)
            {
                alltop["Saturday"][top_three[2][0]] += tweet_array[x].distance;
            }   
            weekendcount += 1;
        }
     }

    longestactday = {};

    longestactday["weekends"] = (alltop["Sunday"][[top_three[0][0]]] + alltop["Sunday"][[top_three[1][0]]] + alltop["Sunday"][[top_three[2][0]]] + alltop["Saturday"][[top_three[0][0]]] + alltop["Saturday"][[top_three[1][0]]] + alltop["Saturday"][[top_three[2][0]]])/weekendcount;
    longestactday["weekdays"] = (alltop["Monday"][[top_three[0][0]]] + alltop["Monday"][[top_three[1][0]]] + alltop["Monday"][[top_three[2][0]]] + alltop["Tuesday"][[top_three[0][0]]] + alltop["Tuesday"][[top_three[1][0]]] + alltop["Tuesday"][[top_three[2][0]]] + alltop["Wednesday"][[top_three[0][0]]] + alltop["Wednesday"][[top_three[1][0]]] + alltop["Wednesday"][[top_three[2][0]]] + alltop["Thursday"][[top_three[0][0]]] + alltop["Thursday"][[top_three[1][0]]] + alltop["Thursday"][[top_three[2][0]]] + alltop["Friday"][[top_three[0][0]]] + alltop["Friday"][[top_three[1][0]]] + alltop["Friday"][[top_three[2][0]]]) /weekdaycount;
    
    //sorting dictionary by distance
    var items1 = Object.keys(longestactday).map(function(key) {
        return [key, longestactday[key]];
      });
      
    // Sort the array based on the second element
    items1.sort(function(first, second) {
        return second[1] - first[1];
    });
      

    document.getElementById('weekdayOrWeekendLonger').innerText = items1[0][0];

    //for plot 1
    plot1 = [];
    for(const[key, value] of Object.entries(activity_dict)){
        if (key.localeCompare("unknown") != 0)
        {
            plot1.push({"activity": key, "count": value});
        }

        
    }

    activity_vis_spec = {
      "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
      "description": "A graph of the number of Tweets containing each type of activity.",
      "data": {
        "values": plot1
      },
      //TODO: Add mark and encoding
      "mark": "point",
      "encoding": {
        "x":{
            "bin": "true",
            "field": "activity",
            "type": "nominal"
        },
        "y":{
            
            "field": "count",
            "type": "quantitative"
        }
    
      }
    };

    
    //for plot 2/3
    plot2 = [];
    topacts = [top_three[0][0], top_three[1][0], top_three[2][0]];
    for(let i = 0; i < tweet_array.length; i++){
        if(tweet_array[i].time.getDay() == 0){
            if ( topacts.includes(tweet_array[i].activityType)){

                plot2.push({"time (day)": "Sunday", "distance": tweet_array[i].distance, "activity": tweet_array[i].activityType});
            }
        }
        else if(tweet_array[i].time.getDay() == 1) {
            if ( topacts.includes(tweet_array[i].activityType)){
            plot2.push({"time (day)": "Monday", "distance": tweet_array[i].distance, "activity": tweet_array[i].activityType});
            }
        }
        else if(tweet_array[i].time.getDay() == 2) {
            if ( topacts.includes(tweet_array[i].activityType)){
            plot2.push({"time (day)": "Tuesday", "distance": tweet_array[i].distance, "activity": tweet_array[i].activityType});
            }
        }
        else if(tweet_array[i].time.getDay() ==3) {
            if ( topacts.includes(tweet_array[i].activityType)){
            plot2.push({"time (day)": "Wednesday", "distance": tweet_array[i].distance, "activity": tweet_array[i].activityType});
            }
        }
        else if(tweet_array[i].time.getDay() == 4) {
            if ( topacts.includes(tweet_array[i].activityType)){
            plot2.push({"time (day)": "Thursday", "distance": tweet_array[i].distance, "activity": tweet_array[i].activityType});
            }
        }
        else if(tweet_array[i].time.getDay() == 5) {
            if ( topacts.includes(tweet_array[i].activityType)){
            plot2.push({"time (day)": "Friday", "distance": tweet_array[i].distance, "activity": tweet_array[i].activityType});
            }
        }
        else if(tweet_array[i].time.getDay() == 6) {
            if ( topacts.includes(tweet_array[i].activityType)){
            plot2.push({"time (day)": "Saturday", "distance": tweet_array[i].distance, "activity": tweet_array[i].activityType});
            }
        }


    }

    distancevisspec = {
        "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
        "description": "A graph of the distances of the top 3 activities by day.",
        "data": {
          "values": plot2
        },
        //TODO: Add mark and encoding
        "mark": "point",
        "encoding": {
          "x":{
              "bin": "true",
              "field": "time (day)",
              "type": "nominal",
              "sort": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
          },
          "y":{
              
              "field": "distance",
              "type": "quantitative",
              //"aggregate": "mean"
          },
          "color": {
                "field": "activity"
          }
      
        }
      };

      distancevisspec_agg = {
        "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
        "description": "A graph of the average distances of the activities by day.",
        "data": {
          "values": plot2
        },
        //TODO: Add mark and encoding
        "mark": "point",
        "encoding": {
          "x":{
              "bin": "true",
              "field": "time (day)",
              "type": "nominal",
              "sort": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
          },
          "y":{
              
              "field": "distance",
              "type": "quantitative",
              "aggregate": "mean"
          },
          "color": {
                "field": "activity"
          }
      
        }
      };
    
    vegaEmbed('#activityVis', activity_vis_spec, {actions:false});
    vegaEmbed('#distanceVis', distancevisspec, {actions:false});
    
    var btn = document.getElementById('aggregate');
    var change = document.getElementsByClassName('btn btn-primary')[0];
    counter = 0;

    btn.addEventListener("click", function(){
        if(counter%2 == 0){
            document.getElementById('distanceVis').style.display = 'none';
            document.getElementById('distanceVisAggregated').style.display = 'inline';
            vegaEmbed('#distanceVisAggregated', distancevisspec_agg, {actions:false});
        change.innerText = "Show all activites";
        counter ++;

        }else{
            document.getElementById('distanceVis').style.display = 'inline';
            document.getElementById('distanceVisAggregated').style.display = 'none';
            vegaEmbed('#distanceVis', distancevisspec, {actions:false});
        change.innerText = "Show means";
    counter ++;
        }
        
    });


}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
    loadSavedRunkeeperTweets().then(parseTweets);
});