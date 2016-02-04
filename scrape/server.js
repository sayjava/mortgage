var scrapper = require('./scrapper');

scrapper.scrape('TSLA',function (error, sts) {
   console.log(sts.income[0]);
});