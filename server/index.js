const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.maxConnections = 2500;

let requestCounter = 0;

const responses = {
  users: [ /* array of responses */]
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/', (req, res) => {
  requestCounter += 1;
  console.log(`ID: ${ req.body.userId }`);
  console.log(`current requests: ${ requestCounter }`);

  responses.users.push({id: req.body.userId, res: res});
});

setInterval(() => {
  try {
    if(responses.users.length > 0) {
      const id = 0;
      let el = responses.users[id];
      
      el.res.send({message: `Received Response of ID: ${ el.id }!!! With a total of Requests: ${ requestCounter }`, id: el.id});
      el.res.end();
   
      responses.users.splice(id, 1);
      requestCounter -= 1;
    }
  } catch (err) {
    console.log(`ERROR ON CATCH: ${ err }`);
  }
}, Math.floor(10 + Math.random() * 10) * 1000)

const server = app.listen(9999, () => console.log('Example app listening on port 9999!'));
server.setTimeout(0);
