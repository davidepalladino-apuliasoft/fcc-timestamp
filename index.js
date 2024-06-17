// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
const { type } = require('express/lib/response');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get('/api/:date?', (req, res) => {
  let date = req.params.date;
  if (date == null || date == undefined || date === "") {
    date = new Date(date);
  } else {
    if (date.match(`[0-9]{4}-[0-9]{2}-[0-9]{2}`)) {
      date = new Date(date)
    } else if (date.match(`[0-9]+`)) {
      date = new Date(parseInt(date))
    } else {
      res.json({error : "Invalid Date"});
    }
  }

  res.json({
    utc: date.toUTCString(), 
    unix: date.getTime() 
  });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
