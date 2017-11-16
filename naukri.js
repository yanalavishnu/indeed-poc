var request = require('request');
const cheerio = require('cheerio');

var options = {
  url: 'https://www.naukri.com/full-stack-developer-jobs-in-hyderabad-secunderabad',
  headers: {
    'User-Agent': 'workruitBot'
  }
};


request(options, function (error, response, body) {
  if (error) {
  	console.error(error);
  } else if (response && response.statusCode===200) {
  	var $ = cheerio.load(body)
  	var links = $('div[itemtype="http://schema.org/JobPosting"]');
  	var jobs = [];
    $(links).each(function(i, div) {
    	var currentJob = {
    	};
    	// console.log($(this).text());
    	currentJob.title = $($(this).find($('li[itemprop="title"]'))).text().trim();
    	currentJob.experience = $($(this).find($('span[itemprop="experienceRequirements"]'))).text().trim();
    	currentJob.skills = $($(this).find($('span[itemprop="skills"]'))).text().trim();
    	currentJob.link = $($(this).find($('a'))).attr('href');
    	currentJob.company = $($(this).find($('span[itemprop="hiringOrganization"]'))).text().trim(); 	
    	currentJob.location = $($(this).find($('span[itemprop="jobLocation"]'))).text().trim();
    	currentJob.salary = $($(this).find($('span[itemprop="baseSalary"]'))).text().trim();
    	currentJob.summary = $($(this).find($('span[itemprop="description"]'))).text().trim();
    	currentJob.postedOn = $($(this).find($('span.date'))).text().trim();
    	// console.log(currentJob);
    	jobs.push(currentJob);
    });
    console.log(jobs);
  } else {
  	console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  	console.log(body);
  }
});