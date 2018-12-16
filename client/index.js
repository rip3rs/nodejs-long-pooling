const axios = require('axios');

const url = 'http://137.74.198.244:9999/'

const request = (id) => {
  console.log('Sent Request with ID: ' + id );
  axios.post(url, { userId: id })
    .then(response => {
      console.log(response.data.message);
      // request(response.data.id);
    })
    .catch(error => {
      console.log(error);
    });
}

setInterval(() => {
  request(new Date().getTime());
}, 100);
// for (let i = 0; i < 2000; i++) {
// }


