const express = require("express");
const https = require("http");
const app = express();
const port = 3000;

function getAirlineCodes() {
  return new Promise(resolve => {
    https.get('http://www.airportcodes.org/', resp => {
      let data = '';

      resp.on('data', chunk => {
        data += chunk;
      })

      resp.on('end', () => {
        let lines = data.split('\n');
        lines = lines.map(line => line.substring(line.indexOf('(')+1, line.indexOf(')')));
        lines = lines.filter(line => line.length == 3);
        resolve(lines);
      })
    })
  }) 
}

(async () => {

  const airlineCodes = await getAirlineCodes();

  app.use('/', require('./routes/index'))
  app.use('/api', require('./routes/api'))


  app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
  })
})()
