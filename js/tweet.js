"use strict";
class Tweet {
    constructor(tweet_text, tweet_time) {
        this.text = tweet_text;
        this.time = new Date(tweet_time); //, "ddd MMM D HH:mm:ss Z YYYY"
    }
    get source() {
        if (this.text.startsWith("Just completed")) {
            return "completed_event";
        }
        else if (this.text.startsWith("Achieved")) {
            return "achievement";
        }
        else if (this.text.startsWith("Watch")) {
            return "live_event";
        }
        return "miscellaneous";
    }
    get written() {
        if (this.text.includes("Check it out!")) {
            return false;
        }
        return true;
    }
    get writtenText() {
        if (!this.written) {
            return "";
        }
        var new_string = this.text.split(" ");
        return new_string.slice(0, new_string.length - 2).join(" ");
    }
    get activityType() {
        if (this.source != 'completed_event') {
            return "unknown";
        }
        return this.text.split(" ")[5];
    }
    get distance() {
        if (this.source != 'completed_event') {
            return 0;
        }
        var d = parseInt(this.text.split(" ")[3]);
        if (this.text.split(" ")[4].localeCompare("km") == 0) {
            d = d * 0.621371;
        }
        return d;
    }
    getHTMLTableRow(rowNumber, tweet) {
        var alink = "";
        var theindex = 0;
        var totaltweet = tweet.text.split(" ");
        for (let i = 0; i < totaltweet.length; i++) {
            if (totaltweet[i].includes("http")) {
                alink = totaltweet[i];
                totaltweet[i] = '<a href="' + alink + '">' + alink + '</a>';
                break;
            }
        }
        const subtext = totaltweet.join(" ");
        var read_line = '<tr><th>' + rowNumber + '</th><th>' + tweet.activityType + '</th><th>' + subtext + '</th></tr>';
        return read_line;
    }
}
