var request = require('request');
const cheerio = require('cheerio');

request('https://www.indeed.co.in/full-stack-developer-jobs-in-Hyderabad,-Telangana', function (error, response, body) {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  if (error) {
  	console.error(error);
  } else if (response && response.statusCode===200) {
  	var $ = cheerio.load(body)
  	var links = $('#resultsCol > div.row');
  	var jobs = [];
    $(links).each(function(i, div) {
    	var currentJob = {
    	};
    	// console.log($(this).text());
    	currentJob.title = $($(this).find($('.jobtitle'))).text().trim();
    	currentJob.link = 'https://www.indeed.co.in'+$($(this).find($('.turnstileLink'))).attr('href');
    	currentJob.company = $($(this).find($('.company'))).text().trim(); 	
    	currentJob.location = $($(this).find($('.location'))).text().trim();
    	currentJob.salary = $($(this).find($('span.no-wrap'))).text().trim();
    	currentJob.summary = $($(this).find($('span.summary'))).text().trim();
    	currentJob.postedOn = $($(this).find($('span.date'))).text().trim();
    	// console.log(currentJob);
    	jobs.push(currentJob);
    });
    console.log(jobs);
    // console.log(links[0].text());
  }
  // console.log('body:', body); // Print the HTML for the Google homepage.
});